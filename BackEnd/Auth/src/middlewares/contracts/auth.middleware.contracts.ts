import {
  login,
  register,
  refreshToken,
  logout,
  getAllUser,
} from "../../controllers/Auth.Controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { isRoleAdmin, isRoleUser } from "../../middlewares/roleMiddleWare";
const {
  registerValidation,
  loginValidation,
} = require("../../validations/auth.schema.validation");

// Middleware cho đăng nhập
export const loginMiddlewares = [loginValidation, validateRequest];

// Middleware cho đăng ký
export const registerMiddlewares = [registerValidation, validateRequest];

// Middleware cho refresh token
export const refreshTokenMiddlewares = [validateRequest];

// Middleware cho logout
export const logoutMiddlewares = [validateRequest];

// Middleware cho getAllUser với quyền admin
export const getAllUserMiddlewares = [validateRequest, isRoleAdmin];

// Middleware cho một route chỉ yêu cầu người dùng là "user"
export const userMiddlewares = [validateRequest, isRoleUser];
