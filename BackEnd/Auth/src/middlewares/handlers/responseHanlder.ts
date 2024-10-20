import { Response } from "express";
import { IApiSuccess } from "../../interfaces/Response/IApiSuccess";

export const responseHandler = <T>(
  res: Response,
  statusCode: number,
  message: string,
  data?: T
): Response<IApiSuccess<T>> => {
  const response: IApiSuccess<T> = {
    statusCode,
    message,
    data,
    timestamp: new Date().toISOString(), // Thời gian hiện tại
    path: res.locals.path, // URL endpoint hiện tại
  };

  return res.status(statusCode).json(response);
};
