import { count, eq } from "drizzle-orm";
import { categories, database, products, stocks } from "../database";
import { type Response, type Request } from "express";
import type Category from "../models/Category";

async function getAllUserCategories(req: Request, res: Response) {
  try {
    const userId = req.user?.id!;

    const userCategories = await database
      .select({
        id: categories.id,
        name: categories.name,
        stockId: stocks.id,
        stock: stocks.name,
        productsCount: count(products.id),
      })
      .from(categories)
      .innerJoin(stocks, eq(categories.stockId, stocks.id))
      .leftJoin(products, eq(categories.id, products.categoryId))
      .where(eq(categories.userId, userId))
      .groupBy(categories.id);

    res.status(200).json(userCategories);
  } catch (error) {
    res.status(500).json({
      error: "Could not select categories from database",
    });
  }
}

async function create(req: Request, res: Response) {
  try {
    const { name, stockId }: Category = req.body;
    const userId = req.user?.id!;

    const newCategory = await database
      .insert(categories)
      .values({ name, stockId, userId })
      .returning();

    res.status(200).json(newCategory);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the category." });
  }
}

async function update(req: Request, res: Response) {
  try {
    const { id, ...rest } = req.body;

    const updatedCategory = await database
      .update(categories)
      .set({ id, ...rest })
      .where(eq(categories.id, parseInt(id)));

    res.status(200).json(updatedCategory);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating a category" });
  }
}

async function getById(req: Request, res: Response) {
  try {
    const categoryId = parseInt(req.params.id);
    const requestedCategory = await database
      .select()
      .from(categories)
      .where(eq(categories.id, categoryId));

    res.status(200).json(requestedCategory[0]);
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while fetching the category by ID.",
    });
  }
}

async function getByStock(req: Request, res: Response) {
  try {
    const stockId = parseInt(req.params.id);
    const requestedStock = await database
      .select()
      .from(categories)
      .where(eq(categories.stockId, stockId));

    res.status(200).json(requestedStock);
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while fetching the category by stock ID.",
    });
  }
}

async function getQuantity(req: Request, res: Response) {
  try {
    const userId = req.user?.id!;

    const categoriesQuantity = database
      .select({
        quantity: count(categories.id),
      })
      .from(categories)
      .where(eq(categories.userId, userId))
      .get();

    res.status(200).json(categoriesQuantity);
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
