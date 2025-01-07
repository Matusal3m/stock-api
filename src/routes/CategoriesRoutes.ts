import { Router } from "express";
import CategoriesController from "../controllers/CategoriesController";

const controller = new CategoriesController();

const router = Router();

router
  .route("/")
  .get(controller.getAllUserCategories)
  .post(controller.create)
  .put(controller.update);

router
  .get("/quantity", controller.getQuantity);

router.route("/:id").get(controller.getById);

router.route("/stock/:id").get(controller.getByStock);

export default router;
