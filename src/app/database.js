import { connect } from "mongoose";

export default async function connectDB() {
  try {
    const MONGODB_URL = process.env.MONGODB_URL;
    await connect(MONGODB_URL);
  } catch (error) {
    console.log(error);
    return error;
  }
}
