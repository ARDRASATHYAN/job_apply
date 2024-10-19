import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://sardra9988:273727@cluster0.0v1dx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log("mongodb connected successfully!");
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;