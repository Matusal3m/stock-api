import { count, eq } from "drizzle-orm";
import { categories, database, products, stocks } from "../database";
import type Stock from "../models/Stock";
import { type Response, type Request } from "express";

async function getAllUserStocks(req: Request, res: Response) {
  try {
    const productsCountTable = database
      .select({
        stockId: products.stockId,
        products: count(products.id).as("products"),
      })
      .from(products)
      .where(eq(products.userId, req.user?.id!))
      .groupBy(products.stockId)
      .as("products_count");

    const categoriesCountTable = database
      .select({
        stockId: categories.stockId,
        categories: count(categories.id).as("categories"),
      })
      .from(categories)
      .where(eq(categories.userId, req.user?.id!))
      .groupBy(categories.stockId)
      .as("categories_count");

    const joinedCounterTable = await database
      .select({
        id: stocks.id,
        name: stocks.name,
        productsCount: productsCountTable.products,
        categoriesCount: categoriesCountTable.categories,
      })
      .from(stocks)
      .leftJoin(productsCountTable, eq(productsCountTable.stockId, stocks.id))
      .leftJoin(
        categoriesCountTable,
        eq(categoriesCountTable.stockId, stocks.id)
      )
      .where(eq(stocks.userId, req.user?.id!));

    res.status(200).json(joinedCounterTable);
  } catch (error) {
    res.status(500).json({
      error: "Could not select stocks from database",
    });
    throw error;
  }
}

async function create(req: Request, res: Response) {
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
}

async function update(req: Request, res: Response) {
  try {
    const { id, ...rest } = req.body;
    const queryResult = await database
      .update(stocks)
      .set({ id, ...rest })
      .where(eq(stocks.id, parseInt(id)));

    res.status(200).json(queryResult);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while updating a stock" });
  }
}

async function getById(req: Request, res: Response) {
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
}

async function getQuantity(req: Request, res: Response) {
  try {
    const queryResult = await database
      .select({
        quantity: count(stocks.id),
      })
      .from(stocks)
      .where(eq(stocks.userId, req.user?.id!));

    res.status(200).json(queryResult);
  } catch (error) {
    res.status(500).json({
      error:
        "An error occurred while fetching the quantity of products from a user.",
    });
  }
}

export default {
  getAllUserStocks,
  create,
  update,
  getById,
  getQuantity,
};
