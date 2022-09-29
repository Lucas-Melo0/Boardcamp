import express from "express";
import { gamesGetter } from "../controllers/gamesController.js";

const router = express.Router();

router.get("/games", gamesGetter);

export default router;
