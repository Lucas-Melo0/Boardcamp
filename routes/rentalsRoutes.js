import express from "express";
import {
  rentalGetter,
  rentalMetrics,
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
router.get("/rentals", rentalGetter);
router.delete("/rentals/:id", deleteValidator, rentalsDelete);
router.post("/rentals/:id/return", rentalReturnValidator, rentalReturn);
router.get("/rentals/metrics", rentalMetrics);

export default router;
