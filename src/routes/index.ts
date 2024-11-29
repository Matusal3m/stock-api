import ProductsRoutes from "./ProductsRoutes";
import CategoriesRoutes from "./CategoriesRoutes";
import StocksRoutes from "./StocksRoutes";
import { Router, type Application } from "express";

export default (app: Application) => {
  const router = Router();

  router.use("/products", ProductsRoutes);
  router.use("/categories", CategoriesRoutes);
  router.use("/stocks", StocksRoutes);

  app.use(router);
};
