import { JwtPayload } from "jsonwebtoken";

export interface IJWTPayload {
  name:string,
  email:string,
  role:string
}
