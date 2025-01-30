import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}`
    );
    console.log(
      `\n MongoDB connection SUCCESSFUL!!  DB HOST: ${connectionInstance.connection.host}`
    );
    // console.log(connectionInstance);
  } catch (error) {
    console.log("MongoDB connection is failed !!", error);
    process.exit(1);
  }
};

export default connectDB;
