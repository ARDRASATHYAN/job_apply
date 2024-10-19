import mongoose from "mongoose";

const db = async() =>{
    try {
        await mongoose.connect("mongodb+srv://sardra9988:273727@cluster0.0v1dx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("MongoDB connected successfully!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    } 
}

export default db;