import express from "express";
import {
  downloadOfferLetter,
  GenerateICC,
  downloadICC,
} from "../controllers/certificate.controller.js";
import { asyncHandler } from "../utils/asyncHandlers.utils.js";
const router = express.Router();

router.get("/offerLetter", asyncHandler(downloadOfferLetter));
router.post("/generateIcc", asyncHandler(GenerateICC));
router.get("/icc", asyncHandler(downloadICC));

export default router;
