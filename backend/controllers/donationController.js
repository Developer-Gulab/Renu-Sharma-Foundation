import Donation from "../models/Donation.js";

//Add Donation Controller
export const addDonation = async (req, res) => {
  try {
    const { fullName, email, phone, amount } = req.body;

    if (!fullName || !email || !phone || !amount) {
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
    });

    await donation.save();

    res.status(201).json({
      success: true,
      data: donation,
      message: "Donation recorded successfully!",
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

export const deleteDonations = async (req, res) => {
  try {
    await Donation.deleteMany();
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false });
  }
};
