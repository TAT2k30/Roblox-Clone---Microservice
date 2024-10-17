import { connectMongoDB } from "../config/mongo";

export const initMongoDB = async () => {
  await connectMongoDB();
};