import { Router } from "express";
import DashboardController from "../controllers/DashboardController";

const controller = new DashboardController();

const router = Router();

router.route("/product").get(controller.getProduct);
router.route("/category").get(controller.getCategories);
router.route("/stock").get(controller.getStocks);

export default router;
