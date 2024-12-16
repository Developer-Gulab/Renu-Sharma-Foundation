import projectoverviewModels from "../models/projectoverview.models.js";
import CustomError from "../utils/errorResponse.js";

// Helper function to validate request body
const validateFields = (body, requiredFields) => {
  return requiredFields.every((field) => !!body[field]);
};

// Add Project
const addProject = async (req, res) => {
  const {
    departmentName,
    projectOverview,
    internshipType,
    internshipDuration,
    developmentProcedure,
    requiredSkills,
    internshipPerks,
    internTestimonials,
    departmentSpecificRequirements,
    internshipLocation,
    departmentHead,
    internshipStartDate,
    internshipEndDate,
  } = req.body;

  // Validate required fields
  if (
    !validateFields(req.body, [
      "departmentName",
      "projectOverview",
      "developmentProcedure",
      "requiredSkills",
      "internshipPerks",
    ])
  ) {
    throw new CustomError("Required fields are missing", 400);
  }

  const newProject = new projectoverviewModels({
    departmentName,
    projectOverview,
    internshipType: internshipType || "Unpaid",
    internshipDuration: internshipDuration || 3,
    developmentProcedure,
    requiredSkills,
    internshipPerks,
    internTestimonials: internTestimonials || [],
    departmentSpecificRequirements: departmentSpecificRequirements || {},
    internshipLocation: internshipLocation || "Remote",
    departmentHead: departmentHead || "Not Assigned",
    internshipStartDate,
    internshipEndDate,
  });

  const savedProject = await newProject.save();

  return res.status(201).json({
    status: "Success",
    savedProject,
  });
};

// Get Project
const getProject = async (req, res) => {
  const { departmentName } = req.query;

  if (!departmentName) {
    throw new CustomError("departmentName is required", 400);
  }

  const project = await projectoverviewModels.findOne({ departmentName });

  if (!project) {
    throw new CustomError("Project not found", 404);
  }

  return res.status(200).json(project);
};

// Update Project
const updateProject = async (req, res) => {
  const {
    departmentName,
    projectOverview,
    internshipType,
    internshipDuration,
    developmentProcedure,
    requiredSkills,
    internshipPerks,
    internTestimonials,
    departmentSpecificRequirements,
    internshipLocation,
    departmentHead,
    internshipStartDate,
    internshipEndDate,
  } = req.body;

  // Validate required fields
  if (
    !validateFields(req.body, [
      "departmentName",
      "projectOverview",
      "developmentProcedure",
      "requiredSkills",
      "internshipPerks",
    ])
  ) {
    throw new CustomError("Required fields are missing", 400);
  }

  const updatedProject = await projectoverviewModels.findOneAndUpdate(
    { departmentName },
    {
      $set: {
        projectOverview,
        internshipType,
        internshipDuration,
        developmentProcedure,
        requiredSkills,
        internshipPerks,
        internTestimonials,
        departmentSpecificRequirements,
        internshipLocation,
        departmentHead,
        internshipStartDate,
        internshipEndDate,
      },
    },
    { new: true } // Return updated document
  );

  if (!updatedProject) {
    throw new CustomError("Project not found", 404);
  }

  return res.status(200).json(updatedProject);
};

// Delete Project
const deleteProject = async (req, res) => {
  const { departmentName } = req.body;

  if (!departmentName) {
    throw new CustomError("departmentName is required", 400);
  }

  const deletedProject = await projectoverviewModels.findOneAndDelete({
    departmentName,
  });

  if (!deletedProject) {
    throw new CustomError("Project not found", 404);
  }

  return res.status(200).json({ message: "Project deleted successfully" });
};

export { addProject, getProject, updateProject, deleteProject };
