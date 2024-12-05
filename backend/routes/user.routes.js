import express from "express";
import { body, validationResult } from "express-validator";
import {
  addUser,
  login,
  sendEmailResetPassword,
  userPasswordReset,
  changeUserPassword,
  getUserById,
} from "../controllers/user.controllers.js";
import { authenticateUser } from "../middleware/auth.middleware.js";
import { asyncHandler } from "../utils/asyncHandlers.utils.js";

const router = express.Router();

// Validation middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "failed",
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }
  next();
};

// Registration
router.post("/register", asyncHandler(addUser));

// Login
router.post("/login", asyncHandler(login));

// Password reset routes
router.post(
  "/send-reset-password",
  [body("email").isEmail(), handleValidationErrors],
  asyncHandler(sendEmailResetPassword)
);

router.post(
  "/reset-password/:id/:token",
  [body("newPassword").isLength({ min: 5 }), handleValidationErrors],
  asyncHandler(userPasswordReset)
);

// Change password (authenticated route)
router.post(
  "/change-password",
  [
    authenticateUser,
    body("currentPassword").isLength({ min: 5 }),
    body("newPassword").isLength({ min: 5 }),
    handleValidationErrors,
  ],
  asyncHandler(changeUserPassword)
);

// Protected route example
router.get("/", authenticateUser, asyncHandler(getUserById));

export default router;
