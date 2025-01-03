import { eq } from "drizzle-orm";
import { database, products } from "../database";
import type Product from "../models/Product";
import { type Response, type Request } from "express";

export default class ProductsController {
  getAllUserProducts = async (req: Request, res: Response) => {
    try {
      const queryResult = await database
        .select()
        .from(products)
        .where(eq(products.userId, req.user?.id!));

      res.status(200).json(queryResult);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while fetching products." });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      // O userId daqui vem apenas do modell, mas ele é enviado msm é pelo JWT
      const { userId, ...product }: Product = req.body;

      const queryResult = await database
        .insert(products)
        .values({ userId: req.user?.id!, ...product })
        .returning();
      res.status(200).json(queryResult);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while creating the product." });

      console.log(error);
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const { id, ...rest } = req.body;

      const queryResult = await database
        .update(products)
        .set({ id, ...rest })
        .where(eq(products.id, parseInt(id)));

      res.status(200).json(queryResult);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while updating a product" });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const queryResult = await database
        .select()
        .from(products)
        .where(eq(products.id, id));
      res.status(200).json(queryResult[0]);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while fetching the product by ID." });
    }
  };

  getByCategory = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const queryResult = await database
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
      const queryResult = await database
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
