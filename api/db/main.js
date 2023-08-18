import mongoose from "mongoose";

export const main = async () => {
  try {
    await mongoose.connect(process.env.DBURI);
    console.log(`Connected to DB @ ${process.env.DBURI}`);
  } catch (error) {
    console.log(error);
  }
};
