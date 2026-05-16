import type { Request, Response } from "express";
import type { IUser } from "./user.interface";
import { userService } from "./user.service";

type UserIdParams = {
  id: IUser["id"];
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getUserFromDB();
    res.status(200).json({
      status: "success",
      message: "Users Retrive Successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      error: error,
    });
  }
};

const getUser = async (req: Request<UserIdParams>, res: Response) => {
  const { id } = req.params;
  try {
    const result = await userService.getUserByIdFromDB(id);
    if (result.rows.length === 0) {
      res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "User Retrive Successfully",
        data: result.rows[0],
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.createUserIntoDB(req.body);

    res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      error: error,
    });
  }
};

const updateUser = async (req: Request<UserIdParams>, res: Response) => {
  const { id } = req.params;
  try {
    const result = await userService.updateUserIntoDB(id, req.body);
    if (result.rows.length === 0) {
      res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "User updated successfully",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      error: error,
    });
  }
};

const deleteUser = async (req: Request<UserIdParams>, res: Response) => {
  const { id } = req.params;
  try {
    const result = await userService.deleteUserFromDB(id);

    if (result.rowCount === 0) {
      res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "User deleted successfully",
        data: result.rows[0],
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

export const userController = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
