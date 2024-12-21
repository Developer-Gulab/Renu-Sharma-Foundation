import Donation from "../models/donation.models.js";

//Add Donation Controller
export const addDonation = async (req, res) => {
  try {
    const { fullName, email, phone, amount, status, payment_Id, order_Id } =
      req.body;

    if (
      !fullName ||
      !email ||
      !phone ||
      !amount ||
      !status ||
      !payment_Id ||
      !order_Id
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required field!",
      });
    }

    const donation = new Donation({
      fullName,
      email,
      phone,
      amount,
      status,
      payment_Id,
      order_Id,
      currency: "INR",
    });

    await donation.save();

    res.status(201).json({
      success: true,
      data: donation,
      message: "New Donation recorded successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error!",
      error: error.message,
    });
  }
};

//Get Donations Controller
export const getDonations = async (req, res) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: donations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error!",
      error: error.message,
    });
  }
};
