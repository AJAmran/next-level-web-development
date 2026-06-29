import httpStatus from "http-status";
import { UserService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";

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
    const profile = await UserService.getMyProfileFromDb(
      req.user?.id as string,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User profile fetched successfully",
      data: {
        profile,
      },
    });
  },
);

const updateMyprofile = catchAsync(async (req, res, next) => {
  const userId = req.user?.id as string;
  const payload = req.body;
  const updatedProfile = await UserService.updateMyProfileInDb(userId, payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User profile updated successfully",
    data: {
      updatedProfile,
    },
  });
});

export const UserController = {
  createUser,
  getMyProfile,
  updateMyprofile,
};
