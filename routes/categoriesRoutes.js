import { categoriesGetter } from "../controllers/categoriesControllers.js";
import express from "express";

const router = express.Router();

router.get("/categories", categoriesGetter);

export default router;
