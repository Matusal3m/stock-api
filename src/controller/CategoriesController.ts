import { eq } from "drizzle-orm";
import { categories, database } from "../database";
import { type Request, type Response } from "express";
import type Category from "../models/Category";

export default class CategoriesController {
  private db = database;

  getAll = async (req: Request, res: Response) => {
    const queryResult = await this.db.select().from(categories);

    res.status(200).json(queryResult);
  };

  create = async (req: Request, res: Response) => {
    const category: Category = req.body;

    const queryResult = await this.db
      .insert(categories)
      .values(category)
      .returning();

    res.status(200).json(queryResult);
  };

  getById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    const queryResult = await this.db
      .select()
      .from(categories)
      .where(eq(categories.id, id));

    res.status(200).json(queryResult);
  };

  getByStock = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    const queryResult = await this.db
      .select()
      .from(categories)
      .where(eq(categories.stockId, id));

    res.status(200).json(queryResult);
  };
}
