import express from "express";
import {
  customerAdder,
  customerGetterById,
  customersGetter,
} from "../controllers/customersController.js";
import {
  customerValidation,
  existingCustomerValidation,
} from "../middlewares/customersMiddleware.js";

const router = express.Router();
router.get("/customers", customersGetter);
router.get("/customers/:id", existingCustomerValidation, customerGetterById);
router.post("/customers", customerValidation, customerAdder);

export default router;
