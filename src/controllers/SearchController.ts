import type { Request, Response } from "express";
import { categories, database, products, stocks } from "../database";
import { and, eq, like } from "drizzle-orm";

async function searchByName(req: Request, res: Response) {
  try {
    const { query }: { query: string } = req.body;

    const categoriesResult = await database
      .select({
        id: categories.id,
        name: categories.name,
        stockId: categories.stockId,
        stockName: stocks.name,
      })
      .from(categories)
      .innerJoin(stocks, eq(stocks.id, categories.stockId))
      .where(
        and(
          like(categories.name, `%${query}%`),
          eq(categories.userId, req.user?.id!)
        )
      );

    const productsResult = await database
      .select({
        id: products.id,
        name: products.name,
        stockId: products.stockId,
        stockName: stocks.name,
      })
      .from(products)
      .innerJoin(stocks, eq(stocks.id, products.stockId))
      .where(
        and(
          like(products.name, `%${query}%`),
          eq(products.userId, req.user?.id!)
        )
      );

    await new Promise(() =>
      setTimeout(() => {
        res
          .status(200)
          .json({ products: productsResult, categories: categoriesResult });
      }, 1000)
    );
  } catch (error) {
    console.error("Error on searchByName: ", error);
    res.status(500).json({ message: "Error searching item" });
  }
}

export default {
  searchByName,
};
