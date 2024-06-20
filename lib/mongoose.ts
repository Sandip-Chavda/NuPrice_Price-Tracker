import mongoose from "mongoose";

let isConnected = false;

const DATABASE_URL = process.env.MONGODB_URI;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (!DATABASE_URL) return console.log("MongoDB Url is wrong or not defined");

  if (isConnected) return console.log("=> using existing database connection");

  try {
    await mongoose.connect(DATABASE_URL);

    isConnected: true;

    console.log("Database Connection Established Successfully.");
  } catch (error: any) {
    console.log("DB Connection error :--", error.message);
  }
};
