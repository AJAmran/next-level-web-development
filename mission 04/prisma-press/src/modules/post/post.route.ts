import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { PostController } from "./post.controller";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post("/", auth(Role.USER, Role.ADMIN, Role.AUTHOR),   PostController.createPost);
router.get("/", PostController.getAllPosts);
router.get("/stats", auth(Role.ADMIN), PostController.getPostStats);
router.get("/my-posts", auth(Role.USER, Role.ADMIN, Role.AUTHOR), PostController.getMyPosts);
router.get("/:postId", PostController.getPostById);
router.patch(
  "/:postId",
  auth(Role.USER, Role.ADMIN, Role.AUTHOR),
  PostController.updatePost,
);
router.delete(
  "/:postId",
  auth(Role.USER, Role.ADMIN, Role.AUTHOR),
  PostController.deletePost,
);

export const postRoutes = router;
