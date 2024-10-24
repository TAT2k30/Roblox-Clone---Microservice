import { LoginRequest } from "../interfaces/Request/LoginRequest";
import { responseHandler } from "../middlewares/handlers/responseHanlder";
import { Request, Response } from "express";
import axios from "axios";

export const getItems = async (req: Request, res: Response): Promise<void> => {
  try {
    // Gửi request từ Node.js đến API .NET
    const response = await axios.get("http://localhost:5001/items");

    // Lấy dữ liệu từ response
    const items = response.data;

    // Xử lý phản hồi thành công
    responseHandler(res, 200, "Get all items successfully", {
        items,
    });
  } catch (error) {
    // Xử lý lỗi khi request đến API .NET thất bại
    console.error("Error fetching items:", error);

    // Trả về lỗi cho client
    responseHandler(res, 500, "Failed to fetch items", {
      error: error,
    });
  }
};
