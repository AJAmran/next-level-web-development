import { PostStatus } from "../../../generated/prisma/enums";

export interface ICreatePostPayload {
  title: string;
  content: string;
  thumbnail: string;
  tags: string[];
  isFeatured: boolean;
  status?: PostStatus;
}

export interface IUpdatePostPayload {
  title?: string;
  content?: string;
  thumbnail?: string;
  tags?: string[];
  isFeatured?: boolean;
  status?: PostStatus;
}
