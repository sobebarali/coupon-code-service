import config from "@src/config";
import Logging from "@src/library/logging";
import mongoose from "mongoose";

const connectMongoDB = async (): Promise<void> => {
  try {
    // Connect to MongoDB with additional options for auto-reconnect
    const conn = await mongoose.connect(config.MONGO_DATABASE_URL as string, {
      dbName: "coupon-code-service",
      autoIndex: false,
      // These options enable auto-reconnection in case of network failure
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    });

    Logging.log(`MongoDB Connected: ${conn.connection.host}`);

    // Listen for disconnection events
    mongoose.connection.on("disconnected", () => {
      Logging.warn("MongoDB disconnected. Attempting to reconnect...");
    });

    mongoose.connection.on("reconnected", () => {
      Logging.log("MongoDB reconnected.");
    });

    mongoose.connection.on("error", (err) => {
      Logging.error(`MongoDB Error: ${err}`);
    });
  } catch (error) {
    Logging.error(
      `MongoDB Connection Error: ${error instanceof Error ? error.message : String(error)}`
    );
    process.exit(1);
  }
};

// Gracefully close the MongoDB connection on shutdown
const closeMongoConnection = async (): Promise<void> => {
  try {
    await mongoose.connection.close();
    Logging.log("MongoDB connection closed.");
  } catch (error) {
    Logging.error(`Error closing MongoDB connection: ${error}`);
  }
};

// Export both functions for use in other parts of the app
export { connectMongoDB, closeMongoConnection };
export default connectMongoDB;
