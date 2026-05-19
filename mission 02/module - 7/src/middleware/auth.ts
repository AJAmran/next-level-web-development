import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../config";
import { pool } from "../db";

//1. check if the token exists
//2. verify the token
//3. find the user into db
//4. if the user active or not?
//

const auth = (...roles: any) => {
    console.log("rolesss from authmiddlware",roles);
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // validate token here (e.g., using JWT)
      const token = authHeader.split(" ")[1];
      const decodedToken = jwt.verify(
        token as string,
        config.JWT_SECRET,
      ) as JwtPayload;
      if (!decodedToken) {
        return res.status(401).json({
          status: "fail",
          message: "Unauthorized",
        });
      }

      const userData = await pool.query(
        `
        SELECT id, email, role, name, is_active FROM users WHERE id = $1
        `,
        [decodedToken.id],
      );

      if (userData.rowCount === 0) {
        return res.status(401).json({
          status: "fail",
          message: "Unauthorized",
        });
      }

      const user = userData.rows[0];
      if (!user.is_active) {
        return res.status(403).json({
          status: "fail",
          message: "Forbidden",
        });
      }

      //role based access control
      if(roles.length > 0 && !roles.includes(user.role)){
        return res.status(403).json({
          status: "fail",
          message: "Forbidden",
        });
      }

      //? attach the user to the request object
      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
