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
          stock: stocks.name,
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
          stockId: stocks.id,
          stock: stocks.name,
          productsCount: count(products.id),
        })
        .from(categories)
        .innerJoin(stocks, eq(categories.stockId, stocks.id))
        .leftJoin(products, eq(categories.id, products.categoryId))
        .where(eq(categories.userId, req.user?.id!))
        .groupBy(categories.id);

      const response = queryResult.map((category) => ({
        id: category.id,
        name: category.name,
        stock: { id: category.stockId, name: category.stock },
        productsCount: category.productsCount,
      }));

      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        error: "Could not select categories from database",
      });
    }
  };

  getStocks = async (req: Request, res: Response) => {
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
          eq(categoriesCountTable.stockId, stocks.id),
        )
        .where(eq(stocks.userId, req.user?.id!));

      res.status(200).json(joinedCounterTable);
    } catch (error) {
      res.status(500).json({
        error: "Could not select stocks from database",
      });
      throw error;
    }
  };
}
