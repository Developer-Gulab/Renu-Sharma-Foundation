import express from "express";
import {
  addDept,
  deleteDepartment,
  getDepartment,
  updateDepartment,
} from "../controllers/department.controller.js";
import { asyncHandler } from "../utils/asyncHandlers.utils.js";
import { authenticateUser } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/", asyncHandler(addDept));

router.get("/", authenticateUser, asyncHandler(getDepartment));

router.put("/", authenticateUser, asyncHandler(updateDepartment));

router.delete("/", authenticateUser, asyncHandler(deleteDepartment));

export default router;
