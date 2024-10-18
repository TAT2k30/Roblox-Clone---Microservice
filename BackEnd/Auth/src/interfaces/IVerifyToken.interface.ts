import { JwtPayload } from "jsonwebtoken";
import { IJWTPayload } from "./IJWTPayload.interface";

export interface IVerifyToken {
  success: boolean;
  data?: IJWTPayload; // Có thể là undefined nếu thành công là false
  error?: string; // Thêm thông báo lỗi
}
