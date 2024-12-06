import Submission from "../models/submission.models.js";
import userModel from "../models/user.models.js";
import departmentModels from "../models/department.models.js";
import cloudinaryService from "../services/cloudinary.service.js";
import CustomError from "../utils/errorResponse.js";

// Allowed file types
const allowedMimeTypes = ["image/png", "image/jpeg", "application/pdf"];

/**
 * Create a new submission or update an existing one.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
export const createSubmission = async (req, res, next) => {
  const { departmentName, weekNumber, notes, links, username } = req.body;
  const user = await userModel.findOne({ name: username });
  const departement = await departmentModels.findOne({
    name: departmentName,
  });
  if (!user) throw new CustomError("User Not found", 400);
  if (!departement) throw new CustomError("Department Not found", 400);
  if (!weekNumber) {
    throw new CustomError("User ID and Week Number are required.", 400);
  }
  const userId = user._id;
  const departementId = departement._id;
  const files = [...(req.files?.files || []), ...(req.files?.images || [])];
  const filteredFiles = files.filter((file) =>
    allowedMimeTypes.includes(file.mimetype)
  );

  if (filteredFiles.length === 0) {
    throw new CustomError(
      "No valid file types provided. Only PNG, JPEG, and PDF are allowed.",
      400
    );
  }

  // Upload files to Cloudinary with viewing configuration
  const uploadedFiles = await Promise.all(
    filteredFiles.map(async (file) => {
      let result;

      if (file.mimetype.startsWith("image/")) {
        result = await cloudinaryService.uploadImage(file.buffer, {
          folder: `submissions/${userId}/images`,
        });
      } else if (file.mimetype === "application/pdf") {
        result = await cloudinaryService.uploadPDF(file.buffer, {
          folder: `submissions/${userId}/pdfs`,
          public_id: `${Date.now()}_${file.originalname.replace(
            /\.[^/.]+$/,
            ""
          )}`,
        });
      }

      if (!result.success) {
        throw new CustomError(`Failed to upload file: ${result.error}`, 500);
      }

      return {
        url: result.data.url,
        format: file.mimetype.split("/")[1],
        publicId: result.data.publicId,
      };
    })
  );
  // Separate image and PDF links
  const pdfFiles = uploadedFiles.filter((file) => file.format === "pdf");
  const imageFiles = uploadedFiles.filter((file) => file.format !== "pdf");

  // Check if submission already exists for the user
  const existingSubmission = await Submission.findOne({ userId });
  if (existingSubmission) {
    // Check if submission already exists for the given week
    if (existingSubmission.completedWeek.includes(weekNumber)) {
      // Clean up uploaded files before throwing error
      await Promise.all(
        uploadedFiles.map((file) => cloudinaryService.deleteFile(file.publicId))
      );
      throw new CustomError("Submission for this week already exists.", 400);
    }

    // Update existing submission
    existingSubmission.completedWeek.push(weekNumber);
    existingSubmission.images = [
      ...existingSubmission.images,
      ...imageFiles.map((file) => ({
        url: file.url,
        publicId: file.publicId,
      })),
    ];
    existingSubmission.pdf = [
      ...existingSubmission.pdf,
      ...pdfFiles.map((file) => ({
        url: file.url,
        publicId: file.publicId,
      })),
    ];
    existingSubmission.links = [...existingSubmission.links, ...links];
    existingSubmission.notes = [...existingSubmission.notes, ...notes];
    await existingSubmission.save();
  } else {
    // Create a new submission
    const newSubmission = new Submission({
      username,
      userId,
      departementId,
      completedWeek: [weekNumber],
      images: imageFiles.map((file) => ({
        url: file.url,
        publicId: file.publicId,
      })),
      pdf: pdfFiles.map((file) => ({
        url: file.url,
        publicId: file.publicId,
      })),
      links,
      notes,
    });
    await newSubmission.save();
  }
  res.status(201).json({ message: "Submission created successfully!" });
};

/**
 * Delete a specific submission.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
export const deleteSubmission = async (req, res, next) => {
  const { submissionId } = req.params;

  // Validation: Submission ID is required
  if (!submissionId) {
    throw new CustomError("Submission ID is required.", 400);
  }

  const submission = await Submission.findById(submissionId);

  if (!submission) {
    throw new CustomError("Submission not found.", 404);
  }

  // Delete files from Cloudinary
  const deletePromises = [
    ...submission.images.map((image) =>
      cloudinaryService.deleteFile(image.publicId)
    ),
    ...submission.pdf.map((pdf) => cloudinaryService.deleteFile(pdf.publicId)),
  ];

  await Promise.all(deletePromises);

  // Delete the submission from database
  await Submission.findByIdAndDelete(submissionId);

  res.status(200).json({ message: "Submission deleted successfully!" });
};

/**
 * Retrieve all submissions for a specific user and week.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */

export const getUserSubmission = async (req, res, next) => {
  const { userId } = req.query;

  // Validation: User ID and Week Number are required
  if (!userId) {
    throw new CustomError("userId", 400);
  }

  // Query for submissions by userId and completed week
  const submissions = await Submission.findOne({
    userId,
  });

  // Check if any submissions were found
  if (submissions.length === 0) {
    throw new CustomError(
      "No submissions found for the given user and week.",
      404
    );
  }

  // Send the response with submissions
  res.status(200).json({
    success: true,
    data: submissions,
  });
};
