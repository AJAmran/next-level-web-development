import { Router } from "express";
import { UserController } from "./user.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post("/register", UserController.createUser);
router.get("/me", auth(Role.USER, Role.ADMIN), UserController.getMyProfile);

router.put("/my-profile", auth(Role.USER, Role.ADMIN), UserController.updateMyprofile);

export const userRouter = router;
