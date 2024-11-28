import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectWithDB } from "./config/db.js";
dotenv.config();
const PORT = process.env.PORT || 5000;
import donationRoutes from "./routes/donationRoutes.js";
const app = express();

//Connect database
connectWithDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/donations", donationRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
