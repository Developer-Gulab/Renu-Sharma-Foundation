import { Schema, Model, model } from "mongoose";

const departmentSchema = new Schema( 
  {
    name: {
      type: String,
      required: true,
    },
    taskId: {
      type:Schema.Types.ObjectId,
      ref:"Task"
    },
    projectId: {
      type:Schema.Types.ObjectId,
      ref:"Overview"
    }
  },
  { timestamps: true }
);

export default model("department", departmentSchema);
