import { NextFunction, Request, Response } from "express";
import { Role } from "../../generated/prisma/enums";
import { catchAsync } from "../utils/catchAsync";
import { JwtUtils } from "../utils/jwt";
import config from "../config";
import { prisma } from "../lib/prisma";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        name: string;
        email: string;
        role: Role;
      };
    }
  }
}

export const auth = (...requiredRoles: Role[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken
      ? req.cookies.accessToken
      : req.headers.authorization?.startsWith("Bearer")
        ? req.headers.authorization.split(" ")[1]
        : req.headers.authorization;

    if (!token) {
      throw new Error("You are not logged in");
    }

    const varifiedToken = JwtUtils.verifyToken(token, config.JWT_ACCESS_SECRET);
    if (!varifiedToken.success) {
      throw new Error(varifiedToken.error?.message || "Invalid token");
    }
    
    const payload = varifiedToken.data;
    if (!payload || typeof payload === "string") {
      throw new Error("Invalid token payload");
    }

    const { id, name, email, role } = payload;

    if (requiredRoles.length && !requiredRoles.includes(role)) {
      throw new Error("You are not authorized to access this route");
    }

    const user = await prisma.user.findUnique({
      where: {
        id,
        email,
        name,
        role,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    if (user.activeStatus === "BLOCKED") {
      throw new Error("User is blocked");
    }

    req.user = {
      id,
      name,
      email,
      role,
    };

    next();
  });
};
