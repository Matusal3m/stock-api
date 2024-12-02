import type { NextFunction, Request, Response } from "express";
import jwtService from "jsonwebtoken";

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const jwt = req.headers.authorization!;
    const JWT_SECRET = process.env.JWT_SECRET!;

    const userData = jwtService.verify(jwt, JWT_SECRET);

    req.body.userData = JSON.parse(userData as string);

    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};
