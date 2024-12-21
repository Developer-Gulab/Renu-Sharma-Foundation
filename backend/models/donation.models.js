import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Success", "Fail", "Pending"],
    required: true,
  },
  payment_Id: {
    type: String,
    required: true,
  },
  order_Id: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Donation = new mongoose.model("Donation", donationSchema);
export default Donation;
