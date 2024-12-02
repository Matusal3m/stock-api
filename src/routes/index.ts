import ProductsRoutes from "./ProductsRoutes";
import CategoriesRoutes from "./CategoriesRoutes";
import StocksRoutes from "./StocksRoutes";
import AuthenticationRoutes from "./AuthenticationRoutes"
import { Router, type Application } from "express";
import AuthMiddleware from "../middlewares/AuthMiddleware";

export default (app: Application) => {
  const router = Router();

  router.use("/products", ProductsRoutes, AuthMiddleware);
  router.use("/categories", CategoriesRoutes, AuthMiddleware);
  router.use("/stocks", StocksRoutes, AuthMiddleware);
  router.use("/auth", AuthenticationRoutes);

  app.use(router);
};
