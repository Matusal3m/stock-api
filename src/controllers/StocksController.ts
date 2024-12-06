import { eq } from "drizzle-orm";
import { database, stocks } from "../database";
import type Stock from "../models/Stock";
import { type Response, type Request } from "express";

export default class StocksController {
  getAllUserStocks = async (req: Request, res: Response) => {
    try {
      const queryResult = await database
        .select()
        .from(stocks)
        .where(eq(stocks.userId, req.user?.id!));

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
      const userId = req.user?.id!;

      const result = await database
        .insert(stocks)
        .values({ name, userId })
        .returning();

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
      const queryResult = await database
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

      const result = await database
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
