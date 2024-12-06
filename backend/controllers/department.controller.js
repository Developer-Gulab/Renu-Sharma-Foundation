import departmentModels from "../models/department.models.js";
import taskModels from "../models/task.models.js";
import projectoverviewModels from "../models/projectoverview.models.js";
import CustomError from "../utils/errorResponse.js";

const addDept = async (req, res) => {
  const { departmentName } = req.body;

  if (!departmentName) {
    throw new CustomError("Department Name is required", 400);
  }

  const existingDept = await departmentModels.findOne({ name: departmentName });
  if (existingDept) {
    throw new CustomError("Department Already Exists", 409);
  }

  const taskId = await taskModels.findOne({ departmentName });
  const projectId = await projectoverviewModels.findOne({ departmentName });

  const department = new departmentModels({
    name: departmentName,
    taskId: taskId ? taskId._id : null,
    projectId: projectId ? projectId._id : null
  });

  const savedDepartment = await department.save();
  return res.status(201).json(savedDepartment);
};

const getDepartment = async (req, res) => {
  const { departmentName } = req.body;

  if (!departmentName) {
    throw new CustomError("Department Name is required", 400);
  }

  const findDepartment = await departmentModels.findOne({ name: departmentName })
    .populate("projectId")
    .populate("taskId");

  if (!findDepartment) {
    throw new CustomError("Department Not Found", 404);
  }

  return res.status(200).json(findDepartment);
};

const updateDepartment = async (req, res) => {
  const { departmentName, taskId, projectoverviewId } = req.body;

  if (!departmentName) {
    throw new CustomError("Department Name is required", 400);
  }

  const findDepartment = await departmentModels.findOne({ name: departmentName });

  if (!findDepartment) {
    throw new CustomError("Department Not Found", 404);
  }

  const updateDept = {
    taskId: taskId || findDepartment.taskId,
    projectoverviewId: projectoverviewId || findDepartment.projectId
  };

  const updatedDepartment = await departmentModels.findOneAndUpdate(
    { name: departmentName },
    updateDept,
    { new: true }
  );

  return res.status(200).json(updatedDepartment);
};

const deleteDepartment = async (req, res) => {
  const { departmentName } = req.body;

  if (!departmentName) {
    throw new CustomError("Department Name is required", 400);
  }

  const findDept = await departmentModels.findOne({ name: departmentName });

  if (!findDept) {
    throw new CustomError("Department Not Found", 404);
  }

  await departmentModels.findOneAndDelete({ name: departmentName });
  return res.status(200).json({ message: "Department Deleted Successfully" });
};

export { addDept, getDepartment, updateDepartment, deleteDepartment };