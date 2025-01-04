import { Router } from "express";
import DashboardController from "../controllers/DashboardController";

const controller = new DashboardController();

const router = Router();

router.route("/products").get(controller.getProduct);
router.route("/categories").get(controller.getCategories);
router.route("/stocks").get(controller.getStocks);

export default router;
