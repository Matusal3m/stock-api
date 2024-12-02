import type { NextFunction, Request, Response } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;
  const method = req.method;
  const auth = req.headers.authorization;

  console.table({ body, method, auth });

  next();
};
