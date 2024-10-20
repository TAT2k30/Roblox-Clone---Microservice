import mongoose from "mongoose";

// const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/myapp";

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}`, {
      dbName: process.env.DB_NAME,
    });

    mongoose.connection.on("connected", () => {
      console.log("Mongoose connected to db");
    });

    mongoose.connection.on("error", (err) => {
      console.log(err.message);
    });

    mongoose.connection.on("dissconnected", () => {
      console.log("Mongoose disconnected to db");
    });
  } catch (error) {
    console.error("MongoDB connection failed", error);
    process.exit(1);
  }
};
