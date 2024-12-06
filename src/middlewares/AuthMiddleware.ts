import type { NextFunction, Request, Response } from "express";
import jwtService from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        name: string;
      };
    }
  }
}

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const jwt = req.headers.authorization!;
    const JWT_SECRET = process.env.JWT_SECRET!;

    const userData = jwtService.verify(jwt, JWT_SECRET) as {
      id: number;
      email: string;
      name: string;
    };

    req.user = userData;

    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
    console.log({ error });
  }
};
