import { Router } from "express";
import StocksController from "../controllers/StocksController";

const router = Router();

router
  .route("/")
  .get(StocksController.getAllUserStocks)
  .post(StocksController.create)
  .put(StocksController.update);

router.get("/quantity", StocksController.getQuantity);

router.route("/:id").get(StocksController.getById);

export default router;
