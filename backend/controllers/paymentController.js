import Stripe from "stripe";
import dotenv from "dotenv";
import Donation from "../models/Donation.js";
dotenv.config();
const stripe = new Stripe(process.env.STRIPESECRETKEY);

//Create Checkout session
export const createCheckout = async (req, res) => {
  try {
    const { name, email, phone, amount } = req.body;
    //creating customer
    const customer = await stripe.customers.create({
      name: name, // Customer name
      email: email, // Customer email,
      phone: phone,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer: customer.id,
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "Donation",
              description: "Your Donation help us change lives!",
              images: [
                "https://www.creativefabrica.com/wp-content/uploads/2020/05/21/Donation-box-with-hand-logo-illustration-Graphics-4173454-1.jpg",
              ],
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    return res.status(200).json({
      success: true,
      message: "Checkout session created!",
      sessionId: session.id,
      sessionUrl: session.url,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error!" });
  }
};

//Handle Webhook
export const handleWebhook = async (req, res) => {
  const endpointSecret = process.env.WEBHOOK_SECRET;
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (error) {
    console.error(`Webhook signature verification failed: ${error.message}`);
    return res.status(400).send(`Webhook error: ${error.message}`);
  }

  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object;
      const customerId = paymentIntent.customer;

      let customer = {
        id: "N/A",
        name: "N/A",
        email: "N/A",
      };

      if (customerId) {
        customer = await stripe.customers.retrieve(customerId);
      }

      try {
        const paymentDetails = new Donation({
          paymentIntentId: paymentIntent.id,
          amount: paymentIntent.amount_received / 100,
          currency: paymentIntent.currency,
          status: "succeeded",
          customerId: customer.id,
          fullName: customer.name || "N/A",
          email: customer.email || "N/A",
          phone: customer.phone,
        });

        // Save the failed payment info along with customer details
        await paymentDetails.save();
        console.log("Payment successfull!", paymentDetails);
      } catch (error) {
        console.error("Error saving payment details:", error);
      }
      break;

    //Payment Intent failed
    case "payment_intent.payment_failed":
      const failedPaymentIntent = event.data.object;
      const failedCustomerId = failedPaymentIntent.customer;

      let failedCustomer = {
        id: "N/A",
        name: "N/A",
        email: "N/A",
      };

      if (failedCustomerId) {
        failedCustomer = await stripe.customers.retrieve(failedCustomerId);
      }

      // Save to the database
      try {
        // Extract payment and customer details for failed payment
        const failedPaymentDetails = new Donation({
          paymentIntentId: failedPaymentIntent.id,
          amount: failedPaymentIntent.amount_received || 0,
          currency: failedPaymentIntent.currency,
          status: "failed",
          customerId: failedCustomer.id,
          fullName: failedCustomer.name || "N/A",
          email: failedCustomer.email || "N/A",
          phone: failedCustomer.phone,
        });

        // Save the failed payment info along with customer details
        await failedPaymentDetails.save();
        console.log("Payment failed:", failedPaymentDetails);
      } catch (error) {
        console.error("Error saving failed payment details:", error);
      }
      break;
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }
  res.json({ received: true });
};
