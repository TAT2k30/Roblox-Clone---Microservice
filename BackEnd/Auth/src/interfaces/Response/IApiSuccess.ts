export interface IApiSuccess<T> {
    statusCode: number;   // Mã trạng thái HTTP (ví dụ: 200, 201)
    message: string;      // Thông báo về kết quả thành công
    data?: T;             // Dữ liệu trả về (tùy chọn)
    timestamp: string;    // Thời gian phản hồi
    path: string;         // Endpoint liên quan
  }
  