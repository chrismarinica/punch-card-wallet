import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

interface JwtPayload {
  id: string;
}

declare module "express-serve-static-core" {
  interface Request {
    clientId?: string;
    businessId?: string;
  }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1]; // Expecting "Bearer <token>"

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    // Use baseUrl or path to detect which type
    if (req.baseUrl.includes("/client")) {
      req.clientId = decoded.id;
    } else if (req.baseUrl.includes("/business")) {
      req.businessId = decoded.id;
    }

    // Ensure we attached something
    if (!req.clientId && !req.businessId) {
      return res.status(403).json({ message: "Unauthorized user type" });
    }

    next();
  } catch (err) {
    console.error("JWT Verify Error:", err);
    return res.status(401).json({ message: "Invalid token" });
  }
};