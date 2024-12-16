import express from "express";
import { asyncHandler } from "../utils/asyncHandlers.utils.js";
import { upload ,getALLImages} from "../controllers/Images.controller.js";
import multer from "multer";

const storage = multer.memoryStorage();

const muterMiddleware = multer({
  storage,
}).fields([
  { name: "images", maxCount: 1000 }, // 3 images maximum
]);

const router = express.Router();

router.post("/", muterMiddleware, asyncHandler(upload));
router.get("/",  asyncHandler(getALLImages));

export default router;
