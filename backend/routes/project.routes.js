import express from "express";
import {
  addProject,
  getProject,
  updateProject,
  deleteProject,
} from "../controllers/projectoverview.controller.js";
import { asyncHandler } from "../utils/asyncHandlers.utils.js";
const router = express.Router();

router.get("/", asyncHandler(getProject));
router.post("/", asyncHandler(addProject));
router.put("/", asyncHandler(updateProject));
router.delete("/", asyncHandler(deleteProject));

export default router;
