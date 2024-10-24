import mongoose from "mongoose";

export const connectMongoDB = async () => {
  const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017";
  const dbName = process.env.DB_NAME || "User";

  const connectWithRetry = async () => {
    try {
      await mongoose.connect(`${mongoURI}/${dbName}`, {
        serverSelectionTimeoutMS: 5000, // Max time Mongoose waits to connect to MongoDB
        socketTimeoutMS: 45000, // Max time for each operation
      });

      console.log(`Mongoose connected to ${dbName}`);

      mongoose.connection.on("error", (err) => {
        console.error(`Mongoose connection error: ${err.message}`);
      });

      mongoose.connection.on("disconnected", () => {
        console.warn("Mongoose disconnected from the database");
      });
    } catch (error) {
      console.error(
        "MongoDB connection failed, retrying in 5 seconds...",
        error
      );
      setTimeout(connectWithRetry, 5000); // Retry after 5 seconds
    }
  };

  connectWithRetry(); // Start the connection attempt
};
