import { count, eq } from "drizzle-orm";
import { categories, database, products, stocks } from "../database";
import type { Request, Response } from "express";

export default class DashboardController {
  getProduct = async (req: Request, res: Response) => {
    try {
      const queryResult = await database
        .select({
          id: products.id,
          name: products.name,
          quantity: products.quantity,
          description: products.description,
          category: categories.name,
          stocks: stocks.name,
        })
        .from(products)
        .where(eq(products.userId, req.user?.id!))
        .innerJoin(categories, eq(products.categoryId, categories.id))
        .innerJoin(stocks, eq(products.stockId, stocks.id));

      res.status(200).json(queryResult);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Could not select products from database" });
    }
  };

  getCategories = async (req: Request, res: Response) => {
    try {
      const queryResult = await database
        .select({
          id: categories.id,
          name: categories.name,
          stock: stocks.name,
          productsCount: count(products.id),
        })
        .from(categories)
        .innerJoin(stocks, eq(categories.stockId, stocks.id))
        .innerJoin(products, eq(categories.id, products.categoryId))
        .where(eq(categories.userId, req.user?.id!))
        .groupBy(categories.id);

      res.status(200).json(queryResult);
    } catch (error) {
      res.status(500).json({
        error: "Could not select categories from database",
        details: JSON.stringify(error),
      });
    }
  };

  getStocks = async (req: Request, res: Response) => {
    try {
      const productsCountTable = await database
        .select({
          stockId: products.stockId,
          products: count(products.id).as("products"),
        })
        .from(products)
        .where(eq(products.userId, req.user?.id!))
        .groupBy(products.stockId)
        .as("products_count");

      const categoriesCountTable = await database
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
        .innerJoin(
          productsCountTable,
          eq(productsCountTable.stockId, stocks.id)
        )
        .innerJoin(
          categoriesCountTable,
          eq(categoriesCountTable.stockId, stocks.id)
        )
        .where(eq(stocks.userId, req.user?.id!));

      res.status(200).json(joinedCounterTable);
    } catch (error) {
      res.status(500).json({
        error: "Could not select stocks from database",
        details: JSON.stringify(error),
      });
      throw error;
    }
  };
}
