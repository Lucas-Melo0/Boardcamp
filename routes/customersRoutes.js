import express from "express";
import {
  customerAdder,
  customerGetterById,
  customersGetter,
  customerUpdater,
} from "../controllers/customersController.js";
import {
  customerUpdateValidation,
  customerValidation,
  existingCustomerValidation,
} from "../middlewares/customersMiddleware.js";

const router = express.Router();
router.get("/customers", customersGetter);
router.get("/customers/:id", existingCustomerValidation, customerGetterById);
router.post("/customers", customerValidation, customerAdder);
router.put("/customers/:id", customerUpdateValidation, customerUpdater);

export default router;
