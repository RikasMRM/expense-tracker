import express from "express";

import expensesController from "../controllers/expensesController.js";
import { authMiddleware } from "../utils/middleware.js";

const router = express.Router();

router.use(authMiddleware); // Protect all routes below with authentication

router.get("/", expensesController.getAllExpenses);
router.post("/", expensesController.createExpense);
router.put("/:id", expensesController.updateExpense);
router.delete("/:id", expensesController.deleteExpense);

module.exports = router;
