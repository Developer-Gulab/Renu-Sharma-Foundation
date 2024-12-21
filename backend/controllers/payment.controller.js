import Razorpay from "razorpay";
import crypto from "crypto";
import PDFDocument from "pdfkit";
import nodemailer from "nodemailer";

//created order
export const createOrder = async (req, res) => {
  const { amount } = req.body;

  const razorpay = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
  });

  const options = {
    amount: parseInt(parseFloat(amount) * 100),
    currency: "INR",
    receipt: "order_receipt_11",
  };

  try {
    const order = await razorpay.orders.create(options);

    res
      .status(200)
      .json({ success: true, message: "Payment process complete!", order });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Payment process failed!", error });
  }
};

//Verifing order
export const verifyOrder = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userDetails,
      paymentDetails,
    } = req.body;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generatedSignature === razorpay_signature) {
      generateReciept(paymentDetails, userDetails);
      res
        .status(200)
        .json({ success: true, message: "Payment verified successfully!" });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Payment verification failed!" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
};

//Generate payment reciept
export const generateReciept = (paymentDetails, userDetails) => {
  const doc = new PDFDocument();
  let buffers = [];
  doc.on("data", buffers.push.bind(buffers));
  doc.on("end", () => {
    const pdfData = Buffer.concat(buffers);
    sendReceipt(paymentDetails, userDetails, pdfData);
  });

  // Header
  doc.fontSize(20).text("DONATION RECEIPT", { align: "center" });
  doc.moveDown(2);

  // Receipt Information
  doc.fontSize(12).text(`Receipt Date: ${new Date().toLocaleDateString()}`);
  doc.text(`Organization Name: RenuSharma Foundation`);
  doc.text(`Address: Delhi, India`);
  doc.moveDown();

  // Donor Details
  doc.fontSize(14).text("Donor Details:", { underline: true });
  doc.fontSize(12).text(`Name: ${userDetails.name}`);
  doc.text(`Email: ${userDetails.email}`);
  userDetails.phone && doc.text(`Contact: ${userDetails.phone}`);
  doc.moveDown();

  // Donation Information
  doc.fontSize(14).text("Donation Information:", { underline: true });
  doc.fontSize(12).text(`Contribution Amount: ₹ ${paymentDetails.amount}`);
  doc.text(`Date of Donation: ${new Date().toLocaleDateString()}`);
  doc.text(
    `Purpose: Donation to provide medical care and improve health services for those in need.`
  );
  doc.moveDown();

  // Acknowledgment Message
  doc.text(
    `Thank you for your generous contribution of ₹ ${paymentDetails.amount} to RenuSharma Foundation, a non-profit organization in India. Your support is greatly appreciated.`
  );
  doc.moveDown();

  doc.text(`Donor Name: ${userDetails.name} `);

  // Finalize PDF
  doc.end();
  return buffers;
};

//Sending Receipt through email
export const sendReceipt = (paymentDetails, userDetails, pdfData) => {
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    port: 587,
    auth: {
      user: process.env.SENDER,
      pass: process.env.PASSKEY,
    },
  });

  transporter.sendMail({
    from: `"RenuSharma Foundation" ${process.env.SENDER}`,
    to: userDetails.email,
    subject: "Payment Receipt",
    text: "Please find your payment receipt attached.",
    html: `
    <p>Dear ${userDetails.name},</p>
    <p>Thank you for your generous donation to Renusharma Foundation. We are pleased to acknowledge the receipt of your donation, which will help us continue our efforts to donation to provide medical care and improve health services for those in need.</p>
    
    <h3>Donation Details:</h3>
    <ul>
      <li><strong>Donor Name:</strong> ${userDetails.name}</li>
      <li><strong>Donation Amount:</strong> ₹ ${paymentDetails.amount}</li>
      <li><strong>Date of Donation:</strong> ${new Date().toLocaleDateString()}</li>
      <li><strong>Transaction Reference ID:</strong> ${
        paymentDetails.paymentId
      }</li>
    </ul>
    
    <p>Once again, thank you for your kind support.</p>
    
    <p>Best regards,<br>
    <br>
    RenuSharma Foundation
  `,
    attachments: [
      {
        filename: "DonationReciept.pdf",
        content: pdfData,
      },
    ],
  });

  console.log("Receipt sent successfully!");
};
