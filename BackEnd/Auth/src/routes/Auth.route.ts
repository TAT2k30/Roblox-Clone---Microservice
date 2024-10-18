import { Router } from "express";
import {
  getAllUser,
  login,
  logout,
  refreshToken,
  register,
} from "../controllers/Auth.Controller";
import {
  getAllUserMiddlewares,
  loginMiddlewares,
  logoutMiddlewares,
  refreshTokenMiddlewares,
  registerMiddlewares,
} from "../middlewares/contracts/auth.middleware.contracts";

const router = Router();

router.post("/login", loginMiddlewares, login);
router.post("/register", registerMiddlewares, register);
router.post("/refresh-token", refreshTokenMiddlewares, refreshToken);
router.delete("/logout", logoutMiddlewares, logout);
router.get("/getAllUser", getAllUserMiddlewares, getAllUser);

export default router;
