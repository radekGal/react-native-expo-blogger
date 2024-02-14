import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('db connected')
  } catch (err: any) {
    console.log(`Error: ${err.message}`);
    process.exit(1);
  }
}

export default connectDB;