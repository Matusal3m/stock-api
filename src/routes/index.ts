import ProductsRoutes from "./ProductsRoutes";
import CategoriesRoutes from "./CategoriesRoutes";
import StocksRoutes from "./StocksRoutes";
import AuthenticationRoutes from "./AuthenticationRoutes"
import { Router, type Application } from "express";
import AuthMiddleware from "../middlewares/AuthMiddleware";

export default (app: Application) => {
  const router = Router();

  router.use("/products", AuthMiddleware, ProductsRoutes);
  router.use("/categories", AuthMiddleware, CategoriesRoutes);
  router.use("/stocks", AuthMiddleware, StocksRoutes);
  router.use("/auth", AuthenticationRoutes);
  
  app.use(router);
};
