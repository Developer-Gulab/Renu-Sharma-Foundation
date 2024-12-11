import mongoose from "mongoose";

// Connect to MongoDB
export const connectWithDB = async () => {
  console.log(process.env.MONGODB_URI);
  try {
    mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", err);
  }
};
