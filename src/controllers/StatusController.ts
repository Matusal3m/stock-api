import { eq } from "drizzle-orm";
import { database, stocks } from "../database";
import type Stock from "../models/Stock";
import { type Response, type Request } from "express";

export default class StatusController {
  status = (req: Request, res: Response) => {
    res.send({status: "Ok"});
  };
}

