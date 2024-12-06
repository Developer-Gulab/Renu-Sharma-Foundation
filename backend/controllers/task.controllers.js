import Task from "../models/task.models.js";
import CustomError from "../utils/errorResponse.js";

export const addingTaskToAllWeeks = async (req, res) => {
  if (!Array.isArray(req.body)) {
    throw new CustomError("Request body must be an array of tasks", 400);
  }
  const newTasks = await Task.insertMany(req.body);
  return res.status(201).json({
    success: true,
    message: "Successfully added all tasks",
    tasks: newTasks,
  });
};

export const updateParticularWeekTasks = async (req, res) => {
  const { departmentName, weekNumber, updatedTask } = req.body;

  if (!departmentName || !weekNumber || !updatedTask) {
    throw new CustomError(
      "title, weekNumber, and updatedTask are required fields",
      400
    );
  }

  const task = await Task.findOne({ departmentName: title.toLowerCase() });
  if (!task) {
    throw new CustomError("Task not found", 404);
  }

  if (weekNumber < 1 || weekNumber > task.weeklyPlans.length) {
    throw new CustomError(
      `Invalid week number. Must be between 1 and ${task.weeklyPlans.length}`,
      400
    );
  }

  const weekIndex = weekNumber - 1;
  if (!task.weeklyPlans[weekIndex]) {
    task.weeklyPlans[weekIndex] = [];
  }

  task.weeklyPlans[weekIndex] = task.weeklyPlans[weekIndex].map((plan) => ({
    ...plan,
    ...updatedTask,
    updatedAt: new Date(),
  }));

  const updatedDocument = await task.save();

  return res.status(200).json({
    success: true,
    message: "Task successfully updated",
    task: updatedDocument,
  });
};

export const deleteTaskAtParticularWeek = async (req, res) => {
  const { title, weekNumber } = req.body;

  if (!title || !weekNumber) {
    throw new CustomError("Both title and weekNumber are required fields", 400);
  }

  const task = await Task.findOne({ mainTitle: title.toLowerCase() });
  if (!task) {
    throw new CustomError("Task not found", 404);
  }

  if (weekNumber < 1 || weekNumber > task.weeklyPlans.length) {
    throw new CustomError(
      `Invalid week number. Must be between 1 and ${task.weeklyPlans.length}`,
      400
    );
  }

  task.weeklyPlans.splice(weekNumber - 1, 1);
  await task.save();

  return res.status(200).json({
    success: true,
    message: "Successfully deleted week's tasks",
  });
};

export const getAllTasksOfParticularDepartment = async (req, res) => {
  const { title } = req.query;

  if (!title) {
    throw new CustomError("Title is required", 400);
  }

  const tasks = await Task.findOne({ mainTitle: title.toLowerCase() });
  if (!tasks) {
    throw new CustomError("No tasks found for this department", 404);
  }

  return res.status(200).json({
    success: true,
    data: tasks,
  });
};

export const getTaskofParticularDepartmentofOneWeek = async (req, res) => {
  const { title, weekNumber } = req.query;
  console.log(title,weekNumber);

  if (!title || !weekNumber) {
    throw new CustomError("Both title and weekNumber are required", 400);
  }

  const task = await Task.findOne({ departmentName: title });
  console.log(task);
  if (!task) {
    throw new CustomError("Task not found", 404);
  }

  const weekTask = task.weeklyPlans[Number(weekNumber) - 1];
  console.log(weekTask);
  if (!weekTask) {
    throw new CustomError(`No tasks found for week ${weekNumber}`, 404);
  }

  return res.status(200).json({
    success: true,
    weekTask,
  });
};
