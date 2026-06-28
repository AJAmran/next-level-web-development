import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";
import config from "../../config";
import { CreateUserPayload } from "./user.interface";
import jwt from "jsonwebtoken";

//register user
const createUserIntoDb = async (payload: CreateUserPayload) => {
  const { email, name, password, profilePhoto } = payload;
  //check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  //compress the password
  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.BCRYPT_SALT_ROUNDS),
  );

  //create the user
  const createdUser = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      profile: {
        create: {
          profilePhoto: profilePhoto,
        },
      },
    },
  });

  const user = await prisma.user.findUnique({
    where: {
      id: createdUser.id,
      email: createdUser.email,
    },
    omit: {
      password: true,
    },
    include: {
      profile: true,
    },
  });

  return user;
};

const getMyProfileFromDb = async (userId: string) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
    omit: {
      password: true,
    },
    include: {
      profile: true,
    },
  });

  return user;
};

const updateMyProfileInDb = async (userId: string, payload: any) => {
  const { name, email, profilePhoto, bio } = payload;

  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      name,
      email,
      profile: {
        update: {
          profilePhoto,
          bio,
        },
      },
    },
    omit: {
      password: true,
    },
    include: {
      profile: true,
    },
  });

  return updatedUser;
};

export const UserService = {
  createUserIntoDb,
  getMyProfileFromDb,
  updateMyProfileInDb,
};
