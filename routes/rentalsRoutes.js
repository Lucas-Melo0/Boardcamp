import express from "express";
import {
  rentalReturn,
  rentalsAdd,
  rentalsDelete,
} from "../controllers/rentalsController.js";
import {
  deleteValidator,
  rentalReturnValidator,
  rentalsValidator,
} from "../middlewares/rentalsMiddleware.js";

const router = express.Router();

router.post("/rentals", rentalsValidator, rentalsAdd);
router.delete("/rentals/:id", deleteValidator, rentalsDelete);
router.post("/rentals/:id/return", rentalReturnValidator, rentalReturn);

export default router;
