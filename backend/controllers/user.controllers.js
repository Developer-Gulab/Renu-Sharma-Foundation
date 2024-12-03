import userModel from "../models/user.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { GenerateOfferLetter } from "./certificate.controller.js";
import CustomError from "../utils/errorResponse.js";

// Add User (Register)
export const addUser = async (req, res) => {
  const {
    name,
    email,
    startDate,
    endDate,
    departmentName,
    password,
    ...otherDetails
  } = req.body;

  // Check if user exists
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    throw new CustomError("User Already exists", 400);
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create new user
  const newUser = new userModel({
    name,
    email,
    password: hashedPassword,
    startDate,
    endDate,
    departmentName,
    ...otherDetails,
  });

  const savedUser = await newUser.save();
  const parameter = { name, email, departmentName, startDate, endDate };
  await GenerateOfferLetter(parameter);

  // Generate token
  const token = jwt.sign(
    { userId: savedUser._id },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "5d" }
  );

  res.cookie("authToken", token, {
    httpOnly: false,
    sameSite: "Lax",
    secure: false,
  });

  res.status(201).json({
    status: "success",
    user: {
      userId: savedUser._id,
      department: savedUser.departmentName,
      email: savedUser.email,
      name: savedUser.name,
      startDate: savedUser.startDate,
      endDate: savedUser.endDate,
    },
  });
};

// Login User
export const login = async (req, res) => {
  const { email, password } = req.body;

  // Find user
  const user = await userModel.findOne({ email });
  if (!user) {
    throw new CustomError("Invalid credentials", 401);
  }

  // Check password
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new CustomError("Password is invalid", 400);
  }

  // Generate token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "5d",
  });

  res.cookie("authToken", token, {
    httpOnly: false,
    sameSite: "Lax",
    secure: false,
  });

  res.json({
    status: "success",
    user: {
      userId: user._id,
      email: user.email,
      name: user.name,
      department: user.departmentName,
      startDate: user.startDate,
      endDate: user.endDate,
    },
  });
};

// Send Password Reset Email
export const sendEmailResetPassword = async (req, res) => {
  const { email } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) {
    throw new CustomError("User not found", 404);
  }

  // Generate reset token
  const resetToken = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1h" }
  );

  // Save reset token to user
  user.resetToken = resetToken;
  user.resetTokenExpiry = Date.now() + 3600000; // 1 hour
  await user.save();

  // Create email transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Send email
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset Request",
    html: `
      <h2>Password Reset Request</h2>
      <p>Click the link below to reset your password:</p>
      <a href="${process.env.FRONTEND_URL}/reset-password/${user._id}/${resetToken}">
        Reset Password
      </a>
      <p>This link will expire in 1 hour.</p>
    `,
  });

  res.json({
    status: "success",
    message: "Password reset email sent",
  });
};

// Reset Password
export const userPasswordReset = async (req, res) => {
  const { id, token } = req.params;
  const { newPassword } = req.body;

  // Verify token
  try {
    jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch {
    throw new CustomError("Invalid or expired token", 401);
  }

  // Find user and verify token
  const user = await userModel.findOne({
    _id: id,
    resetToken: token,
    resetTokenExpiry: { $gt: Date.now() },
  });

  if (!user) {
    throw new CustomError("Invalid or expired reset link", 401);
  }

  // Hash new password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  // Update user password and clear reset token
  user.password = hashedPassword;
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;
  await user.save();

  res.json({
    status: "success",
    message: "Password reset successful",
  });
};

// Change Password
export const changeUserPassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user.userId; // From auth middleware

  // Find user
  const user = await userModel.findById(userId);
  if (!user) {
    throw new CustomError("User not found", 404);
  }

  // Verify current password
  const isValidPassword = await bcrypt.compare(currentPassword, user.password);
  if (!isValidPassword) {
    throw new CustomError("Current password is incorrect", 401);
  }

  // Hash new password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  // Update password
  user.password = hashedPassword;
  await user.save();

  res.json({
    status: "success",
    message: "Password changed successfully",
  });
};

export const getUserById = async (req, res) => {
  const userId = req.userId;
  if (!userId) throw new CustomError("UserId is required", 402);
  const user = await userModel.findById({ _id: userId });
  if (!user) throw new CustomError("no user found", 402);
  return res.status(200).json({
    userId: user._id,
    email: user.email,
    name: user.name,
    department: user.departmentName,
    startDate: user.startDate,
    endDate: user.endDate,
  });
};
