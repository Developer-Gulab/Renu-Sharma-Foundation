import iccModel from "../models/icc.models.js";
import offerletterModel from "../models/offerLetter.models.js";
import InternshipOfferLetterGenerator from "../utils/offerLetterGenerator.js";
import InternshipCompletionCertificateGenerator from "../utils/iccGenerator.js";
import CustomError from "../utils/errorResponse.js";

const GenerateOfferLetter = async (parameter) => {
  const { name, email, startDate, endDate, departmentName } = parameter;

  if (!email || !name) {
    throw new CustomError("Email and name are required", 400);
  }

  const internshipOfferGenerator = new InternshipOfferLetterGenerator();
  const pdfBuffer = await internshipOfferGenerator.generateInternshipOfferLetter(parameter);

  const existingUser = await offerletterModel.findOne({ email });
  
  if (existingUser && existingUser.pdfBuffer) {
    console.log(`Offer letter already generated for user: ${name} (${email})`);
    return { message: "Offer letter already exists", status: "success" };
  }

  if (existingUser) {
    existingUser.pdfBuffer = pdfBuffer;
    await existingUser.save();
    console.log(`Offer letter updated successfully for user: ${name} (${email})`);
    return { message: "Offer letter updated successfully", status: "success" };
  }

  const newOfferLetter = new offerletterModel({
    name,
    email,
    startDate,
    endDate,
    departmentName,
    tenure: 3,
    pdfBuffer
  });

  await newOfferLetter.save();
  console.log(`Offer letter generated successfully for user: ${name} (${email})`);
  return { message: "Offer letter generated successfully", status: "success" };
};

const GenerateICC = async (req, res) => {
  const { name, email, department } = req.body;

  if (!email || !name) {
    throw new CustomError("Email and name are required", 400);
  }

  const iccGenerator = new InternshipCompletionCertificateGenerator();
  const pdfBuffer = await iccGenerator.generateCompletionCertificate(req.body);

  const user = await iccModel.findOne({ email });

  if (user && user.pdfBuffer) {
    return res.status(200).json({
      message: `ICC is already generated for this user: ${name} (${email})`
    });
  }

  if (user) {
    user.pdfBuffer = pdfBuffer;
    await user.save();
  } else {
    const icc = new iccModel({
      ...req.body,
      departmentName: department,
      tenure: 3,
      pdfBuffer
    });
    await icc.save();
  }

  return res.status(200).json({ message: "ICC letter generation successful" });
};

const downloadOfferLetter = async (req, res) => {
  const { email } = req.query;

  if (!email) {
    throw new CustomError("Email is required", 400);
  }

  const employee = await offerletterModel.findOne({ email });

  if (!employee || !employee.pdfBuffer) {
    throw new CustomError("Offer letter not found", 404);
  }

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=${employee.name}_Offer_Letter.pdf`
  );

  const subject = "Welcome to RenuHealthCare - Your Offer Letter Inside";
  // Note: sendMail functionality is commented out in original code
  // sendMail("offerletter", employee.name, subject, email);

  return res.status(200).send(employee.pdfBuffer);
};

const downloadICC = async (req, res) => {
  const { email } = req.query;

  if (!email) {
    throw new CustomError("Email is required", 400);
  }

  const employee = await iccModel.findOne({ email });

  if (!employee || !employee.pdfBuffer) {
    throw new CustomError("ICC not found", 404);
  }

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=${employee.name}_Internship_Completion_Certificate.pdf`
  );

  return res.status(200).send(employee.pdfBuffer);
};

export { GenerateOfferLetter, GenerateICC, downloadOfferLetter, downloadICC };