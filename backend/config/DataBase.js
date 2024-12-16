import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();
const connectToDataBase = async () => {
  const url = process.env.MONGO_URI;
  try {
   await mongoose.connect(url);
   console.log("DataBase Connection Successfull");
  }catch(err){
    console.log(err.message);
  }
}

export default connectToDataBase;