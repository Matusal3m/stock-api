import { Router } from "express";
import CategoriesController from "../controllers/CategoriesController";

const router = Router();

router
  .route("/")
  .get(CategoriesController.getAllUserCategories)
  .post(CategoriesController.create)
  .put(CategoriesController.update);

router.get("/quantity", CategoriesController.getQuantity);

router.route("/:id").get(CategoriesController.getById);

router.route("/stock/:id").get(CategoriesController.getByStock);

export default router;
