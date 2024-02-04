import mongoose from "mongoose";

import dotenv from 'dotenv'
dotenv.config()
const connectDB = async function () {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.DB_URL}/${process.env.DB_NAME}`
    );
    console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("MONGODB connection Failed ", error);
    process.exit(1);
  }
};

export default connectDB;