import { count, eq } from "drizzle-orm";
import { categories, database, products, stocks } from "../database";
import type Product from "../models/Product";
import { type Response, type Request } from "express";

async function getAllUserProducts(req: Request, res: Response) {
  try {
    const userId = req.user?.id!;
    const userProducts = await database
      .select({
        id: products.id,
        name: products.name,
        quantity: products.quantity,
        description: products.description,
        category: categories.name,
        stock: stocks.name,
      })
      .from(products)
      .where(eq(products.userId, userId))
      .innerJoin(categories, eq(products.categoryId, categories.id))
      .innerJoin(stocks, eq(products.stockId, stocks.id));

    res.status(200).json(userProducts);
  } catch (error) {
    res.status(500).json({ error: "An error ocurred while fetching products" });
  }
}

async function create(req: Request, res: Response) {
  try {
    // O userId daqui vem apenas do modell, mas ele é enviado msm é pelo JWT
    const { userId: id, ...product }: Product = req.body;
    const userId = req.user?.id!;

    const newProduct = await database
      .insert(products)
      .values({ userId: userId, ...product })
      .returning();

    res.status(200).json(newProduct);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the product." });

    console.log(error);
  }
}

async function update(req: Request, res: Response) {
  try {
    const { id, ...rest } = req.body;

    const updatedProduct = await database
      .update(products)
      .set({ id, ...rest })
      .where(eq(products.id, parseInt(id)));

    res.status(200).json(updatedProduct);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating a product" });
  }
}

async function getById(req: Request, res: Response) {
  try {
    const productId = parseInt(req.params.id);
    const requestedProduct = await database
      .select()
      .from(products)
      .where(eq(products.id, productId));
    res.status(200).json(requestedProduct[0]);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the product by ID." });
  }
}

async function getByCategory(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const categoryProducts = await database
      .select()
      .from(products)
      .where(eq(products.categoryId, id));
    res.status(200).json(categoryProducts);
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while fetching products by category.",
    });
  }
}

async function getByStock(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const stockProducts = await database
      .select()
      .from(products)
      .where(eq(products.stockId, id));
    res.status(200).json(stockProducts);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching products by stock." });
  }
}

async function getQuantity(req: Request, res: Response) {
  try {
    const productsQuantity = await database
      .select({
        quantity: count(products.id),
      })
      .from(products)
      .where(eq(products.userId, req.user?.id!));

    res.status(200).json(productsQuantity);
  } catch (error) {
    res.status(500).json({
      error:
        "An error occurred while fetching the quantity of products from a user.",
    });
  }
}

export default {
  getAllUserProducts,
  create,
  update,
  getById,
  getByCategory,
  getByStock,
  getQuantity,
};
