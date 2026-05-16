import dotenv from "dotenv";
dotenv.config();

const config = {
  port: Number(process.env.PORT) || 5000,
  dburl: process.env.DBURL || "",
};

export default config;