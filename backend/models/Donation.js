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
  recurring: {
    type: String,
    enum: ["one-time", "monthly", "yearly"],
    default: "one-time",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Donation = new mongoose.model("Donation", donationSchema);
export default Donation;
