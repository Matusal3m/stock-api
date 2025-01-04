import ProductsRoutes from "./ProductsRoutes";
import CategoriesRoutes from "./CategoriesRoutes";
import DashboardRoutes from "./DashboardRoutes";
import StocksRoutes from "./StocksRoutes";
import AuthenticationRoutes from "./AuthenticationRoutes";
import StatusRoutes from "./StatusRoutes";
import { Router, type Application } from "express";
import AuthMiddleware from "../middlewares/AuthMiddleware";

export default (app: Application) => {
  const router = Router();

  router.use("/products", AuthMiddleware, ProductsRoutes);
  router.use("/categories", AuthMiddleware, CategoriesRoutes);
  router.use("/stocks", AuthMiddleware, StocksRoutes);
  router.use("/dashboard", AuthMiddleware, DashboardRoutes);

  router.use("/auth", AuthenticationRoutes);

  router.use("/status", StatusRoutes);
  app.use(router);
};
