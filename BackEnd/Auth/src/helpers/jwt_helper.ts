import JWT = require("jsonwebtoken");
import createError = require("http-errors");
import { IUser } from "../interfaces/IUser.interface";

module.exports = {
  createAccessToken: (user: IUser) => {
    return new Promise((resolve, reject) => {
      const payload = {
        Name: user.username,
        Email: user.email,
        Role: user.role,
      };

      const secret = `${process.env.JWT_SECRET}`;

      const options = {
        expiresIn: "1h",
      };

      JWT.sign(payload, secret, options, (err, token) => {
        if (err) reject(err);
        resolve(token);
      });
    });
  },

  verifyAccessToken: (token: string) => {
    const secret = `${process.env.JWT_SECRET}`;
    try {
      const decoded = JWT.verify(token, secret);
      return { success: true, data: decoded };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
};
