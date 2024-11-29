import { eq } from "drizzle-orm";
import { database, stocks } from "../database";
import type Stock from "../models/Stock";
import { type Request, type Response } from "express";

export default class StocksController {
  private db = database;

  getAll = async (req: Request, res: Response) => {
    const queryResult = this.db.select().from(stocks);

    res.status(200).json(queryResult);
  };

  create = async (req: Request, res: Response) => {
    const { name }: Stock = req.body;

    const result = await this.db
      .select()
      .from(stocks)
      .where(eq(stocks.name, name));

    res.status(200).json(result);
  };

  getById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    const result = this.db.select().from(stocks).where(eq(stocks.id, id));

    res.status(200).json(result);
  };
}
