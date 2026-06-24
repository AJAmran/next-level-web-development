import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";
import config from "../../config";
import { CreateUserPayload } from "./user.interface";


//register user
const createUserIntoDb = async(payload: CreateUserPayload)=>{
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
    data: { email, name, password: hashedPassword },
  });

  //create profile
  await prisma.profile.create({
    data: {
      userId: createdUser.id,
      profilePhoto,
    },
  });

  const user = await prisma.user.findUnique({
    where: {
      id: createdUser.id,
      email: createdUser.email,
    },
    omit: {
      password: true,
    }
    ,
    include: {
      profile: true,
    },
  });

  return user;
}




export const UserService = {
    createUserIntoDb
}