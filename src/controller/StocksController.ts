import { eq } from "drizzle-orm";
import { database, stocks } from "../database";
import type Stock from "../models/Stock";
import { type Request, type Response } from "express";

export default class StocksController {
  private db = database;

  getAll = async (req: Request, res: Response) => {
    try {
      const queryResult = await this.db.select().from(stocks);

      res.status(200).json(queryResult);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while fetching all stocks." });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const { name }: Stock = req.body;

      const result = await this.db.insert(stocks).values({ name }).returning();

      res.status(200).json(result);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while creating a stock." });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const { id, ...rest } = req.body;
      console.log({ id, rest });
      const queryResult = await this.db
        .update(stocks)
        .set({ id, ...rest })
        .where(eq(stocks.id, parseInt(id)));

      res.status(200).json(queryResult);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while updating a stock" });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);

      const result = await this.db
        .select()
        .from(stocks)
        .where(eq(stocks.id, id));

      res.status(200).json(result[0]);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while fetching a stock by id." });
    }
  };
}
