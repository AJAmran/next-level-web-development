import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import httpStatus from "http-status";
import config from "./app/config";
import { AuthRoutes } from "./app/module/auth/auth.route";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import { notFound } from "./app/middleware/notFound";
import { redisClient } from "./app/config/redis";
import crypto from "crypto";

const app: Application = express();

app.use(
  cors({
    origin: config.frontend_url,
    credentials: true,
  }),
);

// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", AuthRoutes);

app.use("/test", async (req: Request, res: Response) => {
  try {



    const otp = crypto.randomInt(100000, 999999).toString();
    console.log("Generated OTP:", otp);

    // await redisClient.set("Forget-password-otp: amran.gmail.com", "123456", {
    //     expiration: {
    //         type: "EX",
    //         value: 60 * 5,
    //     }
    // })


    res.status(httpStatus.OK).json({
      success: true,
      message: "Test route is working fine",
    });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to execute test route",
    });
  }
});

// Basic route
app.get("/", async (req: Request, res: Response) => {
  res.status(httpStatus.OK).json({
    success: true,
    message: "Welcome to PH Healthcare System Backend",
  });
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
