import express from "express";
import * as task from "../controllers/task.controllers.js";
import { asyncHandler } from "../utils/asyncHandlers.utils.js";
import { authenticateUser } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/", asyncHandler(task.addingTaskToAllWeeks));
router.put(
  "/update",
  authenticateUser,
  asyncHandler(task.updateParticularWeekTasks)
);
router.delete(
  "/delete",
  authenticateUser,
  asyncHandler(task.deleteTaskAtParticularWeek)
);
router.get(
  "/",
  authenticateUser,
  asyncHandler(task.getAllTasksOfParticularDepartment)
);
router.get(
  "/particularweek",
  authenticateUser,
  asyncHandler(task.getTaskofParticularDepartmentofOneWeek)
);
export default router;
