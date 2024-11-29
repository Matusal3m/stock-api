import { eq } from "drizzle-orm";
import { database, products } from "../database";
import type Product from "../models/Product";
import { type Request, type Response } from "express";

export default class ProductsController {
  private db = database;

  getAll = async (req: Request, res: Response) => {
    const queryResult = await this.db.select().from(products);

    res.status(200).json(queryResult);
  }

  create = async (req: Request, res: Response) => {
    const product: Product = req.body;

    const queryResult = await this.db
      .insert(products)
      .values(product)
      .returning();

    res.status(200).json(queryResult);
  }

  getById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    const queryResult = await this.db
      .select()
      .from(products)
      .where(eq(products.id, id));

    res.status(200).json(queryResult);
  }

  getByCategory = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    const queryResult = await this.db
      .select()
      .from(products)
      .where(eq(products.categoryId, id));

    res.status(200).json(queryResult);
  }

  getByStock = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    const queryResult = await this.db
      .select()
      .from(products)
      .where(eq(products.stockId, id));

    res.status(200).json(queryResult);
  }
}
