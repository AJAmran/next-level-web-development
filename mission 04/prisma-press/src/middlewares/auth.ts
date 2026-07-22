import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { JwtUtils } from "../utils/jwt";
import config from "../config";
import { Role } from "../../generated/prisma/enums";

export const auth = (...requiredRoles: Role[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            let token = req.cookies?.accessToken;

            if (!token && req.headers.authorization?.startsWith("Bearer ")) {
                token = req.headers.authorization.split(" ")[1];
            }

            if (!token) {
                res.status(httpStatus.UNAUTHORIZED).json({
                    success: false,
                    statusCode: httpStatus.UNAUTHORIZED,
                    message: "You are not logged in. Please log in to access this resource.",
                });
                return;
            }

            const verifiedToken = JwtUtils.verifyToken(token, config.jwt_access_secret);

            if (typeof verifiedToken === "string" || !verifiedToken.success) {
                res.status(httpStatus.UNAUTHORIZED).json({
                    success: false,
                    statusCode: httpStatus.UNAUTHORIZED,
                    message: verifiedToken.error || "Invalid token",
                });
                return;
            }

            const { id, name, email, role } = verifiedToken.data as any;

            if (requiredRoles.length && !requiredRoles.includes(role)) {
                res.status(httpStatus.FORBIDDEN).json({
                    success: false,
                    statusCode: httpStatus.FORBIDDEN,
                    message: "Forbidden. You don't have permission to access this resource",
                });
                return;
            }

            req.user = { id, name, email, role };
            next();
        } catch (error) {
            next(error);
        }
    };
};