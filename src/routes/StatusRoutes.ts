import { Router } from "express";
import StatusController from "../controllers/StatusController";

const controller = new StatusController();

const router = Router();

router.get("/", controller.status);

export default router;
