import { eq } from "drizzle-orm";
import { database, products } from "../database";
import type Product from "../models/Product";
import { type Request, type Response } from "express";

export default class ProductsController {
  private db = database;

  getAll = async (req: Request, res: Response) => {
    try {
      const queryResult = await this.db.select().from(products);
      res.status(200).json(queryResult);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while fetching products." });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const product: Product = req.body;
      const queryResult = await this.db
        .insert(products)
        .values(product)
        .returning();
      res.status(200).json(queryResult);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while creating the product." });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const queryResult = await this.db
        .select()
        .from(products)
        .where(eq(products.id, id));
      res.status(200).json(queryResult);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while fetching the product by ID." });
    }
  };

  getByCategory = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const queryResult = await this.db
        .select()
        .from(products)
        .where(eq(products.categoryId, id));
      res.status(200).json(queryResult);
    } catch (error) {
      res.status(500).json({
        error: "An error occurred while fetching products by category.",
      });
    }
  };

  getByStock = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const queryResult = await this.db
        .select()
        .from(products)
        .where(eq(products.stockId, id));
      res.status(200).json(queryResult);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while fetching products by stock." });
    }
  };
}
