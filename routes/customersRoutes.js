import express from "express";
import { customersGetter } from "../controllers/customersController.js";

const router = express.Router();
router.get("/customers", customersGetter);

export default router;
