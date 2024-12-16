import ImageModel from "../models/images.models.js";
import CloudinaryService from "../services/cloudinary.service.js";
import CustomError from "../utils/errorResponse.js";

export const upload = async (req, res, next) => {
  const { pagename } = req.body;
  const files = req.files?.images;

  if (!pagename) {
    throw new CustomError("pagename is required", 400);
  }

  if (!files || files.length === 0) {
    throw new CustomError("No images provided for upload", 400);
  }

  const bufferArray = files.map((file) => file.buffer);

  const uploadPromises = bufferArray.map((buffer) => {
    return CloudinaryService.uploadImage(buffer, {
      folder: "RenuHealthCare/" + pagename,
    });
  });

  const uploadResponses = await Promise.all(uploadPromises);

  // Extracting URLs from the responses
  const urls = uploadResponses.map((rsp) => rsp.data.url);

  // Saving to the database
  const imageDocument = new ImageModel({
    [pagename]: urls,
  });

  await imageDocument.save();

  res.status(201).json({
    success: true,
    message: "Images uploaded successfully",
    data: urls,
  });
};

export const getALLImages = async (req, res, next) => {
  const { pagename } = req.query;
  const response = await ImageModel.find();
  const response2 = response[0][pagename];
  if (!response2) throw new Error("no item found", 400);
  res.status(200).json({
    status: "Success",
    data: response2,
  });
};
