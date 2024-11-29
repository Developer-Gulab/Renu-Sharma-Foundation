import express from "express";
import dotenv from "dotenv";
import { connectWithDB } from "./config/db.js";
import donationRoutes from "./routes/donationRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import cors from "cors";
import { handleWebhook } from "./controllers/paymentController.js";
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

//Connect database
connectWithDB();

//webhook routes
app.post("/webhook", express.raw({ type: "application/json" }), handleWebhook);

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/donations", donationRoutes);
app.use("/api/payment", paymentRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
