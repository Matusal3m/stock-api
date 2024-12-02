import { Router } from "express";
import CategoriesController from "../controller/CategoriesController";

const controller = new CategoriesController();

const router = Router();

router
  .route("/")
  .get(controller.getAll)
  .post(controller.create)
  .put(controller.update);

router.route("/:id").get(controller.getById);

router.route("/stock/:id").get(controller.getByStock);

export default router;
