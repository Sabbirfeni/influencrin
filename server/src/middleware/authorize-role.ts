import { Request, Response, NextFunction } from "express";

const authorizeRoles = (
  ...allowedRoles: string[]
): ((req: Request, res: Response, next: NextFunction) => void) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as { role: string } | undefined;

    if (!user || !allowedRoles.includes(user.role)) {
      return res.status(403).json({ message: "Forbidden: Access denied." });
    }

    next();
  };
};

export default authorizeRoles;
