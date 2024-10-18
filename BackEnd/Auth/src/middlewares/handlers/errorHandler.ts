import { Request, Response, NextFunction } from "express";
import { IApiError } from "../../interfaces/Response/IApiError";

// Middleware để xử lý lỗi
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errorResponse: IApiError = {
    statusCode: err.status || 500, // Nếu không có mã lỗi, trả về 500 (Internal Server Error)
    message: err.message || "Internal Server Error",
    details: err.details || undefined,
    timestamp: new Date().toISOString(), // Thời gian hiện tại
    path: req.originalUrl, // URL yêu cầu gây ra lỗi
  };

  res.status(errorResponse.statusCode).json(errorResponse);
};
