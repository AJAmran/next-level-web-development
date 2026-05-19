import type { Request, Response } from "express";
import { authService } from "./auth.service";

const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await authService.loginUserIntoDB(req.body);

    const { accessToken, refreshToken } = result;
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    })
    res.status(200).json({
      status: "succss",
      message: "User logged in successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      status: "fail",
      error: error,
      message: error.message
    })
  }
};

export const authController = {
  loginUser,
};
