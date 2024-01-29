import mongoose from "mongoose";

let isConnected = false; // track connection status

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB already running");
    return;
  }

  try {
    console.log("MongoDB connecting..... ", process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "share_prompt",
    });

    isConnected = true;

    console.log("MongoDB connected");
  } catch (err) {
    console.log("MongoDB connection ERROR !!!");
    console.log(error);
  }
};
