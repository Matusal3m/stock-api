import { Router } from "express";
import CategoriesController from "../controller/CategoriesController";

const controller = new CategoriesController();

const router = Router();
// const call = (req: any, res: any) => {
//   res.send("Hello");
// }

router
  .route("/")
  // .get(call)
  .get(controller.getAll)
  .post(controller.create);

router.route("/:id").get(controller.getById);

router.route("/stock/:id");

export default router;
