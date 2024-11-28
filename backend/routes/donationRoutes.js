import express from "express";
import {
  addDonation,
  getDonations,
} from "../controllers/donationController.js";

const router = express.Router();

router.post("/add-donation", addDonation);
router.get("/get-donations", getDonations);

export default router;
