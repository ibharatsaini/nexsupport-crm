import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../config/jwt";
import { UserRole } from "@prisma/client";
import prisma from "../config/prisma";

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: UserRole;
  };
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token)

    if (!token) {
      res.status(401).json({ message: "Authentication required" });
      return;
    }

    const decoded = verifyAccessToken(token) as any;
    req.user = { userId: decoded.userId, role: decoded.role };
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const authorize = (roles: UserRole[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({ message: "Insufficient permissions" });
    }
    next();
  };
};

export const authorizeOrganization = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const organizationId =
      req.params.organizationId || (req.body.organizationId as string);
    console.log(organizationId);
    if (!organizationId) {
      res.status(400).json({ message: "Organization ID is required" });
    }

    const user = await prisma.organizationUser.findFirst({
      where: {
        organizationId,
        userId: req.user!.userId,
      },
    });

    console.log(user);

    if (!user) {
      res.status(403).json({ message: "Unauthorized access to organization" });
    }

    next();
  } catch (error) {
    next(error);
  }
};
