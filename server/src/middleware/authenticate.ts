import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

interface DecodedToken {
  id: string;
  email: string;
}

const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies?.token;

  if (!token) {
    res.status(401).json({ error: "No token provided, authorization denied." });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as unknown;
    const decodedToken = decoded as DecodedToken;

    req.body.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token." });
  }
};

export default authenticate;
