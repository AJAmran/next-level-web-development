import { Router } from "express";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { commentController } from "./comment.constroller";

const router = Router();

router.post("/", auth(Role.USER, Role.ADMIN), commentController.createComment);

router.get("/author/:authorId", commentController.getCommentByAuthorId);

router.get("/:postId", commentController.getCommentByPostId);

router.patch(
  "/:commentId",
  auth(Role.USER, Role.ADMIN),
  commentController.updateComment,
);

router.delete(
  "/:commentId",
  auth(Role.USER, Role.ADMIN),
  commentController.deleteComment,
);

router.put(
  "/:commentId/moderate",
  auth(Role.ADMIN),
  commentController.moderateComment,
);

export const commentRouter = router;
