export interface IApiError {
  statusCode: number; // Mã trạng thái HTTP
  message: string; // Thông báo lỗi ngắn gọn
  details?: string; // Thông tin chi tiết hơn về lỗi (tùy chọn)
  timestamp: string; // Thời gian lỗi xảy ra
  path: string; // Endpoint gây ra lỗi
}
