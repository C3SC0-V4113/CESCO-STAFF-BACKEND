import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    mongoose.connect(process.env.DB_CNN!);

    console.log("DB Online");
  } catch (error) {
    console.log(error);
    throw new Error(`Error initializing Mongo ${error}`);
  }
};

export { dbConnection };
