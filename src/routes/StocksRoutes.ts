import { Router } from "express";
import StocksController from "../controllers/StocksController";

const controller = new StocksController();

const router = Router();

router
  .route("/")
  .get(controller.getAllUserStocks)
  .post(controller.create)
  .put(controller.update);

router
  .get("/quantity", controller.getQuantity);


router.route("/:id").get(controller.getById);

export default router;
