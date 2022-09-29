import express from "express";
import { gamesGetter, gamesSender } from "../controllers/gamesController.js";
import { gamesValidator } from "../middlewares/gamesMiddleware.js";

const router = express.Router();

router.get("/games", gamesGetter);
router.post("/games", gamesValidator, gamesSender);

export default router;
