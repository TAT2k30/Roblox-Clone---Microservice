import { Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  username: string;
  password: string;
  refreshToken?: string;
  role: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}