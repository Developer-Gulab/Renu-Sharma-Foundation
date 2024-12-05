import { Schema, model } from "mongoose";

const attributeSchema = new Schema(
  {
    label: {
      type: String,
      trim: true,
      required: true,
    },
    taskDescription: {
      type: String,
      trim: true,
    },
  },
  { _id: false }
);

const taskListSchema = new Schema(
  {
    taskTitle: {
      type: String,
      trim: true,
      required: true,
    },
    taskDescription: {
      type: String,
      trim: true,
    },
    attributes: [attributeSchema],
  },
  { _id: false }
);

const weeklyPlanSchema = new Schema({
  weekNumber: {
    type: Number,
    required: true,
  },
  weekTitle: {
    type: String,
    required: true,
    trim: true,
  },
  taskList: [taskListSchema],
});

const taskSchema = new Schema(
  {
    mainTitle: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true, // Added index for better query performance
    },
    overview: {
      type: String,
      trim: true,
    },
    departmentName: {
      type: String,
    },
    weeklyPlans: [[weeklyPlanSchema]],
  },
  {
    timestamps: true,
  }
);

export default model("Task", taskSchema);
