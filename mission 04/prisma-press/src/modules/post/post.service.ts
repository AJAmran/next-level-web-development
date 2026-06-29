import { prisma } from "../../lib/prisma";
import { ICreatePostPayload } from "./post.interface";

const createPostIntoDb = async (
  payload: ICreatePostPayload,
  userId: string,
) => {
  const result = await prisma.post.create({
    data: {
      ...payload,
      authorId: userId,
    },
  });

  return result;
};

const getPostsFromDb = async () => {
  const result = await prisma.post.findMany({
    include: {
      author: {
        omit: {
          password: true,
        },
      },
      comments: true,
    },
  });

  return result;
};

const getPostByIdFromDb = async () => {};

const updatePostInDb = async () => {};

const deletePostFromDb = async () => {};

const getMyPostsFromDb = async () => {};

const getPostStatsFromDb = async () => {};

const searchPostsFromDb = async () => {};

export const PostService = {
  createPostIntoDb,
  getPostsFromDb,
  getPostByIdFromDb,
  updatePostInDb,
  deletePostFromDb,
  getMyPostsFromDb,
  getPostStatsFromDb,
  searchPostsFromDb,
};
