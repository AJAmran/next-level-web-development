import dotenv from "dotenv";
dotenv.config();

const config = {
  port: Number(process.env.PORT) || 5000,
  dburl: process.env.DBURL || "",
  JWT_SECRET: process.env.JWT_SECRET || "",
  SALT_ROUNDS: Number(process.env.SALT_ROUNDS) || 10,
  JWTExpiresIn: process.env.JWTExpiresIn || "1d",
};

export default config;