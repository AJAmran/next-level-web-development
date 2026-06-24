import app from "./app";
import config from "./config";
import { prisma } from "./lib/prisma";



const main = async () => {
  try {
    await prisma.$connect();
    console.log("Connected to the database successfully.");
    app.listen(config.PORT, () => {
      console.log(`Server is running on port ${config.PORT}`);
    });
  } catch (error) {
    await prisma.$disconnect();
    console.error("Error starting the server:", error);
    process.exit(1);
  }
};

main();
