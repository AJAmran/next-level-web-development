import httpStatus from "http-status";
import { UserService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";




const createUser = catchAsync(async(req: Request, res: Response) => {
  const payload = req.body;
  const user = await UserService.createUserIntoDb(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User registered successfully",
    data: {
      user,
    }
  })
})

// const createUser = async (req: Request, res: Response) => {
// try {
//     const payload = req.body; 
//     const user = await UserService.createUserIntoDb(payload);

//   res.status(httpStatus.CREATED).json({
//     success: true,
//     statusCode: httpStatus.CREATED,
//     message: "User registered successfully",
//     data: {
//       user,
//     }
//   });
// } catch (error) {
   
// }
// }


export const UserController = {
  createUser,
}