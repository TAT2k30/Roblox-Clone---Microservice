const PREFIX = "app";

const redisKeyNames = {
  USER_SESSION: `${PREFIX}:user:session`, // Key lưu trữ phiên làm việc của người dùng
  AUTH_ACCESS_TOKEN: `${PREFIX}:auth:access_token`, // Key lưu trữ access token
  AUTH_REFRESH_TOKEN: `${PREFIX}:auth:refresh_token`, // Key lưu trữ refresh token
  USER_PROFILE: `${PREFIX}:user:profile`, // Key lưu trữ thông tin người dùng
  CACHE_DATA: `${PREFIX}:cache:data`, // Key lưu trữ dữ liệu cache
};

export default redisKeyNames;
