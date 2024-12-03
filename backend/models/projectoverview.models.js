import { Schema, model } from "mongoose";

const projectSchema = new Schema(
  {
    departmentName: {
      type: String,
      required: true,
    },
    projectOverview: {
      type: String,
      required: true,
    },
    internshipType: {
      type: String,
      enum: ["Paid", "Unpaid"], // Clarified internship type options
      default: "Unpaid",
      required: true,
    },
    internshipDuration: {
      type: Number,
      enum: [3, 6], // Duration options in months
      default: 3,
      required: true,
    },
    developmentProcedure: [
      {
        type: String,
        required: true,
      },
    ],
    requiredSkills: [
      {
        type: String,
        required: true,
      },
    ],
    internshipPerks: [
      {
        type: String,
        required: true,
      },
    ],
    internTestimonials: [
      {
        internName: {
          type: String,
          required: true,
        },
        internRole: {
          type: String,
          required: true,
        },
        testimonialText: {
          type: String,
          required: true,
        },
      },
    ],
    // Department-Specific Fields
    departmentSpecificRequirements: {
      type: Schema.Types.Mixed, // Allow different structures for different departments
      required: false,
    },
  },
  { timestamps: true }
);

export default model("Project", projectSchema);
