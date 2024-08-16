import mongoose from "mongoose";

export async function connect() {
  if (mongoose.connections[0].readyState) {
    console.log("Already Connected to MongoDB");
    return;
  }
  try {
    mongoose.connect(process.env.MONGODB_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Mongo DB connected successfully");
    });

    connection.on("error", (err) => {
      console.log("Mongo DB connection error", err);
      process.exit();
    });
  } catch (error) {
    console.log("Cannot connect to the database");
    console.log(error);
  }
}
