import { Schema, model, type InferSchemaType } from "mongoose";
import { CATEGORIES } from "@expense-tracker/shared";

const expenseSchema = new Schema(
  {
    description: { type: String, required: true, trim: true },
    amount: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, enum: CATEGORIES },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export type Expense = InferSchemaType<typeof expenseSchema>;
export const ExpenseModel = model("Expense", expenseSchema);
