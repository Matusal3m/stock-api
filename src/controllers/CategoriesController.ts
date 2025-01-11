import { count, eq } from "drizzle-orm";
import { categories, database } from "../database";
import { type Response, type Request } from "express";
import type Category from "../models/Category";

async function getAllUserCategories(req: Request, res: Response) {
  try {
    const queryResult = await database
      .select()
      .from(categories)
      .where(eq(categories.userId, req.user?.id!));

    res.status(200).json(queryResult);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching categories." });
  }
}

async function create(req: Request, res: Response) {
  try {
    const { name, stockId }: Category = req.body;
    const userId = req.user?.id!;

    const queryResult = await database
      .insert(categories)
      .values({ name, stockId, userId })
      .returning();

    res.status(200).json(queryResult);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the category." });
  }
}

async function update(req: Request, res: Response) {
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
}

async function getById(req: Request, res: Response) {
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
}

async function getByStock(req: Request, res: Response) {
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
}

async function getQuantity(req: Request, res: Response) {
  try {
    const queryResult = await database
      .select({
        quantity: count(categories.id),
      })
      .from(categories)
      .where(eq(categories.userId, req.user?.id!));

    res.status(200).json(queryResult);
  } catch (error) {
    res.status(500).json({
      error:
        "An error occurred while fetching the quantity of categories from a user.",
    });
  }
}

export default {
  getAllUserCategories,
  create,
  update,
  getById,
  getByStock,
  getQuantity,
};
