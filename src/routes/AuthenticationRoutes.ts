import { Router } from "express";
import AuthController from "../controllers/AuthController";

const controller = new AuthController();

const router = Router();

router.post("/login", controller.login);
router.post("/register", controller.register);

export default router;
