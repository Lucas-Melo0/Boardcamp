import express from "express";
import { rentalsAdd, rentalsDelete } from "../controllers/rentalsController.js";
import {
  deleteValidator,
  rentalsValidator,
} from "../middlewares/rentalsMiddleware.js";

const router = express.Router();

router.post("/rentals", rentalsValidator, rentalsAdd);
router.delete("/rentals/:id", deleteValidator, rentalsDelete);

export default router;
