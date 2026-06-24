import { Request, Response } from "express";
import httpStatus from "http-status";
import { UserService } from "./user.service";




const createUser = async (req: Request, res: Response) => {
try {
    const payload = req.body; 
    const user = await UserService.createUserIntoDb(payload);

  res.status(httpStatus.CREATED).json({
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User registered successfully",
    data: {
      user,
    }
  });
} catch (error) {
    console.error("Error creating user:", error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: "Failed to register user",
      error: error instanceof Error ? error.message : "Unknown error",
    });
}
}


export const UserController = {
  createUser,
}