import express from "express";
import multer from "multer";
import {
  createSubmission,
  getUserSubmission,
  deleteSubmission,
} from "../controllers/submission.controller.js";
import CustomError from "../utils/errorResponse.js";
import { asyncHandler } from "../utils/asyncHandlers.utils.js";

const router = express.Router();

// Allowed file types
const allowedMimeTypes = ["image/png", "image/jpeg", "application/pdf"];

// Configure multer with memory storage and file filtering
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new CustomError(
        `File type ${file.mimetype} is not allowed. Only PNG, JPEG, and PDF are accepted.`,
        400
      ),
      false
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 3 * 1024 * 1024, // 3MB limit per file
    files: 4, // Maximum of 4 files in total
  },
}).fields([
  { name: "files", maxCount: 1 }, // 1 PDF file
  { name: "images", maxCount: 3 }, // 3 images maximum
]);

// Custom error handling middleware for multer
const handleMulterUpload = (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // Handle Multer-specific errors
      let errorMessage = "File upload error";
      let statusCode = 400;

      switch (err.code) {
        case "LIMIT_FILE_SIZE":
          errorMessage = "File size exceeds the 3MB limit";
          break;
        case "LIMIT_FILE_COUNT":
          errorMessage =
            "Too many files uploaded. Maximum is 4 files (1 PDF and 3 images)";
          break;
        case "LIMIT_UNEXPECTED_FILE":
          errorMessage = "Unexpected field name in upload";
          break;
        default:
          errorMessage = err.message;
      }

      return next(new CustomError(errorMessage, statusCode));
    } else if (err) {
      // Handle other errors (including our custom ErrorResponse)
      return next(err);
    }
    next();
  });
};

// Routes with enhanced error handling
// Create a new submission
router.post("/", handleMulterUpload, asyncHandler(createSubmission));

// Get submissions by week number for a specific user
router.get("/", asyncHandler(getUserSubmission));

// Delete a specific submission by ID
router.delete("/:submissionId", asyncHandler(deleteSubmission));

export default router;
