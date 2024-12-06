import mongoose, { Schema } from "mongoose";
import validator from "validator";
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true},
  college: { type: String, required: true},
  city: { type: String, required: true ,},
  state: { type: String, required: true },
  departmentName: { type: String, required: true },
  departmentId: { type: Schema.Types.ObjectId, ref: "Department" },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

const userModel = mongoose.model("user", userSchema);

export default userModel;
