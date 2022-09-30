import express from "express";
import { rentalsAdd } from "../controllers/rentalsController.js";
import { rentalsValidator } from "../middlewares/rentalsMiddleware.js";

const router = express.Router();

router.post("/rentals", rentalsValidator, rentalsAdd);

export default router;
