import { Router } from "express";
import SearchController from "../controllers/SearchController";

const router = Router();

router.post("/", SearchController.searchByName);

export default router;
