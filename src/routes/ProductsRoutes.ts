import { Router } from "express";
import ProductsController from "../controllers/ProductsController";

const router = Router();

router
  .route("/")
  .get(ProductsController.getAllUserProducts)
  .post(ProductsController.create)
  .put(ProductsController.update);

router.get("/quantity", ProductsController.getQuantity);

router.route("/:id").get(ProductsController.getById);

router.route("/category/:id").get(ProductsController.getByCategory);

router.route("/stock/:id").get(ProductsController.getByStock);

export default router;
