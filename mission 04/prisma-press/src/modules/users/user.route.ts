import { Router } from "express";
import { UserController } from "./user.controller";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middlewares/auth";

declare global {
  namespace Express {
    interface Request {
      user?: {
        email: string;
        name: string;
        id: string;
        role: Role;
      };
    }
  }
}

const router = Router();

router.post("/register", UserController.createUser);

router.get(
  "/me",
  auth(Role.ADMIN, Role.USER),
  UserController.getMyProfile,
);

export const userRouter = router;
