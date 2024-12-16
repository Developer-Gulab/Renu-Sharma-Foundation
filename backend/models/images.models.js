import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  donate: [{ type: String, default: [] }],
  gallery: [{ type: String, default: [] }],
  login: [{ type: String, default: [] }],
  signup: [{ type: String, default: [] }],
});

const Image = mongoose.model("Image", imageSchema);

export default Image;