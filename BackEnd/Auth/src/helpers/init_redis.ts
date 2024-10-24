import redis, { createClient, RedisClientType } from "redis";

// Tạo client Redis
const client: RedisClientType = createClient({
  url: "redis://127.0.0.1:6379", // Sử dụng URL để cấu hình
});

// Kết nối đến Redis
client
  .connect()
  .then(() => {
    console.log("Connected to Redis");
  })
  .catch((err) => {
    console.error("Redis connection error:", err);
  });

// Xử lý lỗi
client.on("error", (err) => {
  console.error("Redis error:", err);
});

// Xử lý ready
client.on("redy", () => {
  console.log("Client connected to redis and ready to use ...");
});

//Xử lý end
client.on("end", () => {
  console.log("Client disconnect from redis");
});

//Ngắt kết nôi ssau khi user ngừng hoạt động
process.on("SIGINT", () => {
  client.quit();
});

//CRUD trongn redis
export const setDataToRedis = async (
  key: string,
  value: any,
  expirationInSeconds: number = 3600
) => {
  try {
    await client.set(key, JSON.stringify(value), {
      EX: expirationInSeconds, //Thời gian dữ liệu hết hạn (s).
    });
  } catch (error) {
    console.error("Error setting data to Redis : ", error);
  }
};

export const getDataFromRedis = async (key: string) => {
  try {
    const data = await client.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error getting data from Redis: ", error);
  }
};

export const deleteDataFromRedis = async (key: string) => {
  try {
    await client.del(key);
  } catch (error) {
    console.error("Error deleting data:", error);
  }
};

export const exists = async (key: string) => {
  try {
    const exists = await client.exists(key);
    return exists === 1;
  } catch (error) {
    console.error('Error checking existence:', error);
    return false;
  }
};
export default client;
