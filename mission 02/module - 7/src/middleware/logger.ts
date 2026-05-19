// src/middlewares/logger.middleware.ts

import type { NextFunction, Request, Response } from "express";
import fs from "fs";
import path from "path";

const logFilePath = path.join(process.cwd(), "logs", "access.log");

// Ensure logs directory exists
fs.mkdirSync(path.dirname(logFilePath), { recursive: true });

export const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const start = Date.now();
  res.on("finish", () => {
    const log = `${req.method} ${req.originalUrl} ${
      res.statusCode
    } - ${Date.now() - start}ms\n`;

    fs.appendFile("access.log", log, () => {});
  });

  next();
};
