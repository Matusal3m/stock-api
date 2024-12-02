import { Router } from "express";
import ProductsController from "../controller/ProductsController";

const controller = new ProductsController();

const router = Router();

router
  .route("/")
  .get(controller.getAll)
  .post(controller.create)
  .put(controller.update);

router
  .route("/:id")
  .get(controller.getById)

router
  .route("/category/:id")
  .get(controller.getByCategory);

router
  .route("/stock/:id")
  .get(controller.getByStock);

export default router;
