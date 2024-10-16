import { Request, Response, NextFunction } from "express";
const express = require("express");
const morgan = require("morgan");
const createError = require("http-errors");

require("dotenv").config();

const app = express();

app.get("/", async (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello from express");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
