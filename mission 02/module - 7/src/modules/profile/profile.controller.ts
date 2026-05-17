import type { Request, Response } from "express";
import { profileService } from "./profile.service";

const createProfile = async (req: Request, res: Response) => {
    console.log(req.body);
  try {
    const result = await profileService.createProfileIntoDB(req.body);
    res.status(201).json({
      status: "success",
      message: "Profile created successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      status: "fail",
      message: error.message,
      error: error,
    });
  }
};

export const profileController = {
  createProfile,
};
