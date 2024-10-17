import { Router } from "express";
import {
  login,
  register,
  refreshToken,
  logout,
  getAllUser,
} from "../controllers/Auth.Controller";
import { validateRequest } from "../middlewares/validateRequest";
const {
  registerValidation,
  loginValidation,
} = require("../validations/auth.schema.validation");

const router = Router();

router.post("/login", loginValidation, validateRequest, login);
router.post("/register", registerValidation, validateRequest, register);
router.post("/refresh-token", refreshToken);
router.delete("/logout", logout);
router.get("/getAllUser", getAllUser);

export default router;
