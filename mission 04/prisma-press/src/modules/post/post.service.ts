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

const getPostByIdFromDb = async (postId: string) => {
  const updatedPost = await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      views: {
        increment: 1,
      },
    },
    include: {
      author: {
        omit: {
          password: true,
        },
      },
      comments: true,
    },
  });
  return updatedPost;
};

const updatePostInDb = async () => {};

const deletePostFromDb = async () => {};

const getMyPostsFromDb = async (authorId: string) => {
  const result = await prisma.post.findMany({
    where: {
      authorId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      comments: true,
      author: {
        omit: {
          password: true,
        },
      },

      _count: {
        select: {
          comments: true,
        },
      },
    },
  });

  return result;
};

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
