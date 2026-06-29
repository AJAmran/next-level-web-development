import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";
import { LoginUserPayload } from "./auth.interface";
import { JwtPayload, SignOptions } from "jsonwebtoken";
import config from "../../config";
import { JwtUtils } from "../../utils/jwt";


const loginUser = async (payload: LoginUserPayload) => {
  const { email, password } = payload;
  const user = await prisma.user.findUniqueOrThrow({
    where: { email },
  });

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    throw new Error("Invalid email or password");
  }

  const jwtPayload = {
    id: user?.id,
    name: user?.name,
    email: user?.email,
    role: user?.role,
  };

  const accessToken = JwtUtils.createToken(jwtPayload, config.JWT_ACCESS_SECRET, config.JWT_ACCESS_EXPIRES_IN as SignOptions);

  const refreshToken = JwtUtils.createToken(jwtPayload, config.JWT_REFRESH_SECRET, config.JWT_REFRESH_EXPIRES_IN as SignOptions);

  return { accessToken, refreshToken };
};

const refreshToken = async (refreshToken: string) => {
  //verify the refresh token
  const verifiedRefreshToken = JwtUtils.verifyToken(
    refreshToken,
    config.JWT_REFRESH_SECRET,
  );

  if (!verifiedRefreshToken.success) {
    throw new Error(verifiedRefreshToken.error);
  }

  const { id } = verifiedRefreshToken.data as JwtPayload;

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
  });

  if (user.activeStatus === "BLOCKED") {
    throw new Error("User is blocked");
  }

  const jwtPayload = {
    id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const accessToken = JwtUtils.createToken(
    jwtPayload,
    config.JWT_ACCESS_SECRET,
    config.JWT_ACCESS_EXPIRES_IN as SignOptions,
  );

  return { accessToken };
};

export const AuthService = {
  loginUser,
  refreshToken
};
