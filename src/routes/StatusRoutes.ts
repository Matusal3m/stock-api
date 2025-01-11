import { Router } from "express";
import StatusController from "../controllers/StatusController";

const router = Router();

router.get("/", StatusController.status);

export default router;
