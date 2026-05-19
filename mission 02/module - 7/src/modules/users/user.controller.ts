import type { Request, Response } from "express";
import { userService } from "./user.service";

const getUsers = async (req: Request, res: Response) => {
      console.log(req.user)
  try {
    const result = await userService.getUserFromDB();
    res.status(200).json({
      status: "success",
      message: "Users Retrieve Successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      error: error,
    });
  }
};

const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await userService.getUserByIdFromDB(id as string);
    if (result.rows.length === 0) {
      res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "User Retrieve Successfully",
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

const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await userService.updateUserIntoDB(id as string, req.body);
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

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await userService.deleteUserFromDB(id as string);

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
