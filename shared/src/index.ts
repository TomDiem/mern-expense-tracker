import { z } from "zod";

export const CATEGORIES = [
  "food",
  "transport",
  "entertainment",
  "utilities",
  "health",
  "other",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const createExpenseSchema = z.object({
  description: z.string().min(1).max(100),
  amount: z.number().positive(),
  category: z.enum(CATEGORIES),
  date: z.coerce.date().optional(),
});

export const updateExpenseSchema = createExpenseSchema.partial();

export type CreateExpenseInput = z.infer<typeof createExpenseSchema>;
export type UpdateExpenseInput = z.infer<typeof updateExpenseSchema>;

export type ExpenseDto = {
  _id: string;
  description: string;
  amount: number;
  category: Category;
  date: string;
  createdAt: string;
  updatedAt: string;
};

export type CategorySummary = {
  category: Category;
  total: number;
  count: number;
};
