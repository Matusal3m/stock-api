import { Router } from "express";
import DashboardController from "../controllers/DashboardController";

const router = Router();

router.route("/products").get(DashboardController.getProduct);
router.route("/categories").get(DashboardController.getCategories);
router.route("/stocks").get(DashboardController.getStocks);

export default router;
