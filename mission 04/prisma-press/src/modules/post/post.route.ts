import { Router } from "express";
import { auth } from "../../middleware/auth";
import { PostController } from "./post.controller";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post("/", auth(Role.USER, Role.ADMIN), PostController.createPost);
router.get("/", PostController.getAllPosts);
router.get("/stats", auth(Role.ADMIN), PostController.getPostStats);
router.get("/my-posts", auth(Role.USER, Role.ADMIN), PostController.getMyPosts);
router.get("/:postId", auth(Role.USER, Role.ADMIN), PostController.getPostById);
router.patch(
  "/:postId",
  auth(Role.USER, Role.ADMIN),
  PostController.updatePost,
);
router.delete(
  "/:postId",
  auth(Role.USER, Role.ADMIN),
  PostController.deletePost,
);

export const postRouter = router;
