import { eq } from "drizzle-orm";
import { categories, database } from "../database";
import { type Response, type Request } from "express";
import type Category from "../models/Category";

export default class CategoriesController {
  getAllUserCategories = async (req: Request, res: Response) => {
    try {
      const queryResult = await database
        .select()
        .from(categories)
        .where(eq(categories.userId, req.body.userData.id));

      res.status(200).json(queryResult);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while fetching categories." });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const category: Category = req.body;

      const queryResult = await database
        .insert(categories)
        .values(category)
        .returning();

      res.status(200).json(queryResult);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while creating the category." });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const { id, ...rest } = req.body;

      const queryResult = await database
        .update(categories)
        .set({ id, ...rest })
        .where(eq(categories.id, parseInt(id)));

      res.status(200).json(queryResult);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while updating a category" });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const queryResult = await database
        .select()
        .from(categories)
        .where(eq(categories.id, id));
      res.status(200).json(queryResult[0]);
    } catch (error) {
      res.status(500).json({
        error: "An error occurred while fetching the category by ID.",
      });
    }
  };

  getByStock = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const queryResult = await database
        .select()
        .from(categories)
        .where(eq(categories.stockId, id));
      res.status(200).json(queryResult);
    } catch (error) {
      res.status(500).json({
        error: "An error occurred while fetching the category by stock ID.",
      });
    }
  };
}
