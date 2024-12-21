import express from "express";
import { createOrder, verifyOrder } from "../controllers/payment.controller.js";

const router = express.Router();
router.route("/create-order").post(createOrder);
router.route("/verify-order").post(verifyOrder);
export default router;
