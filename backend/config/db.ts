import mongoose, { connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const url: string | undefined = process.env.MONGO || "";
// console.log(url);
const connectDb = async () => {
  try {
    const conn = await mongoose.connect(url);
    console.log(conn.connection.host);
  } catch (error) {
    console.log(`error in mongodb ${error}`);
  }
};

export default connectDb;
