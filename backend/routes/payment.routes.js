import express from "express";
import { createCheckout } from "../controllers/payment.controller.js";

const router = express.Router();
router.route("/create-checkout-session").post(createCheckout);
export default router;
