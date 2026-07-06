import { Router } from "express";
import {
  createExpense,
  deleteExpense,
  getExpense,
  getSummary,
  listExpenses,
  updateExpense,
} from "../controllers/expense.controller.js";

export const expenseRouter = Router();

expenseRouter.get("/", listExpenses);
expenseRouter.get("/summary", getSummary);
expenseRouter.post("/", createExpense);
expenseRouter.get("/:id", getExpense);
expenseRouter.put("/:id", updateExpense);
expenseRouter.delete("/:id", deleteExpense);
