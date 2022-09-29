import express from "express";
import {
  customerGetterById,
  customersGetter,
} from "../controllers/customersController.js";
import { existingCustomerValidation } from "../middlewares/customersMiddleware.js";

const router = express.Router();
router.get("/customers", customersGetter);
router.get("/customers/:id", existingCustomerValidation, customerGetterById);

export default router;
