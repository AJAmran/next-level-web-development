import httpStatus from "http-status";
import { UserService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import config from "../../config";
import jwt from "jsonwebtoken";
import { JwtUtils } from "../../utils/jwt";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const user = await UserService.createUserIntoDb(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User registered successfully",
    data: {
      user,
    },
  });
});
const getMyProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { accessToken } = req.cookies;
    console.log(req.user, "User")
    const verifiedToken = JwtUtils.verifyToken(
      accessToken,
      config.jwt_access_secret,
    );
    console.log("verifiedToken", verifiedToken);

    if (!verifiedToken.success) {
      throw new Error(verifiedToken.error);
    }

    const profile = await UserService.getMyProfileFromDb((verifiedToken.data as any).id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User profile fetched successfully",
      data: {profile}
    })
  },
);

export const UserController = {
  createUser,
  getMyProfile,
};
