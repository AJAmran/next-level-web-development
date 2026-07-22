import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";
import { LoginUserPayload } from "./auth.interface";
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

  const accessToken = JwtUtils.createToken(jwtPayload, config.jwt_access_secret, config.jwt_access_expires_in);

  const refreshToken = JwtUtils.createToken(jwtPayload, config.jwt_refresh_secret, config.jwt_refresh_expires_in);

  return { accessToken, refreshToken };
};

export const AuthService = {
  loginUser,
};
