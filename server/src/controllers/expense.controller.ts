import type { Request, Response } from "express";
import { ExpenseModel } from "../models/expense.model.js";
import {
  createExpenseSchema,
  updateExpenseSchema,
} from "@expense-tracker/shared";

export async function getExpense(req: Request, res: Response) {
  const expense = await ExpenseModel.findById(req.params.id);
  if (!expense) {
    res.status(404).json({ error: "Expense not found" });
    return;
  }
  res.json(expense);
}

export async function listExpenses(_req: Request, res: Response) {
  const expenses = await ExpenseModel.find().sort({ date: -1 });
  res.json(expenses);
}

export async function createExpense(req: Request, res: Response) {
  const input = createExpenseSchema.parse(req.body);
  const expense = await ExpenseModel.create(input);
  res.status(201).json(expense);
}

export async function updateExpense(req: Request, res: Response) {
  const input = updateExpenseSchema.parse(req.body);
  const expense = await ExpenseModel.findByIdAndUpdate(req.params.id, input, {
    new: true,
    runValidators: true,
  });
  if (!expense) {
    res.status(404).json({ error: "Expense not found" });
    return;
  }
  res.json(expense);
}

export async function deleteExpense(req: Request, res: Response) {
  const expense = await ExpenseModel.findByIdAndDelete(req.params.id);
  if (!expense) {
    res.status(404).json({ error: "Expense not found" });
    return;
  }
  res.status(204).send();
}

export async function getSummary(_req: Request, res: Response) {
  const summary = await ExpenseModel.aggregate([
    {
      $group: {
        _id: "$category",
        total: { $sum: "$amount" },
        count: { $sum: 1 },
      },
    },
    { $project: { _id: 0, category: "$_id", total: 1, count: 1 } },
    { $sort: { total: -1 } },
  ]);
  res.json(summary);
}
