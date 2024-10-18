// src/app.ts
import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import config from "./config";
import AuthRoutes from "./routes/Auth.route";
import { errorHandler } from "./middlewares/handlers/errorHandler";
import { notFoundHandler } from "./middlewares/handlers/notFoundHandler";
import { initMongoDB } from "./helpers/init_mongo";

const app = express();
var cors = require("cors");
// Khởi tạo MongoDB
initMongoDB();

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Định nghĩa các route
app.use("/auth", AuthRoutes);


// Middleware xử lý 404
app.use(notFoundHandler);

// Middleware xử lý lỗi
app.use(errorHandler);

// Lắng nghe cổng
app.listen(config.port, () => {
  console.log(`Server running on port http://localhost:${config.port}`);
});
