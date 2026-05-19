import { pool } from "../../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";

const loginUserIntoDB = async (payload: {
  email: string;
  password: string;
}) => {
  const { email, password } = payload;
  //? check if the user exists
  //? compare the password
  //? generate token with jwt

  const userData = await pool.query(
    `
    SELECT * FROM users WHERE email = $1;
    `,
    [email],
  );

  if (userData.rows.length === 0) {
    throw new Error("User not found");
  }

  const user = userData.rows[0];
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw new Error("Invalid password");
  }

  const jwtPayload = {
    id: user.id,
    email: user.email,
    name: user.name,
    is_active: user.is_active,
  };

  const accessToken = jwt.sign(jwtPayload, config.JWT_SECRET as string, {
    expiresIn: "1d",
  });

  const refreshToken = jwt.sign(
    jwtPayload,
    config.JWT_REFRESH_SECRET as string,
    {
      expiresIn: "7d",
    },
  );

  return { accessToken, refreshToken };
};

export const authService = {
  loginUserIntoDB,
};
