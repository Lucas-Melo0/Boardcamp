import {
  categoriesGetter,
  categoriesSender,
} from "../controllers/categoriesControllers.js";
import express from "express";
import { categoriesValidator } from "../middlewares/categoriesMiddlewares.js";

const router = express.Router();

router.get("/categories", categoriesGetter);
router.post("/categories", categoriesValidator, categoriesSender);

export default router;
