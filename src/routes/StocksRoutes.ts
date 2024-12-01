import { Router } from "express";
import StocksController from "../controller/StocksController";

const controller = new StocksController();

const router = Router();

router
  .route("/")
  .get(controller.getAll)
  .post(controller.create);

router
  .route("/:id")
  .get(controller.getById);

export default router;
