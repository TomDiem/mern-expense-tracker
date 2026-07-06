import type {
  ExpenseDto,
  CategorySummary,
  CreateExpenseInput,
} from "@expense-tracker/shared";

export async function fetchExpenses(): Promise<ExpenseDto[]> {
  const res = await fetch("/api/expenses");
  if (!res.ok) throw new Error(`Failed to fetch expenses: ${res.status}`);
  return res.json();
}

export type NewExpense = CreateExpenseInput;

export async function createExpense(input: NewExpense): Promise<ExpenseDto> {
  const res = await fetch("/api/expenses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(`Failed to create expense: ${res.status}`);
  return res.json();
}

export async function deleteExpense(id: string): Promise<void> {
  const res = await fetch(`/api/expenses/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`Failed to delete expense: ${res.status}`);
}

export async function fetchSummary(): Promise<CategorySummary[]> {
  const res = await fetch("/api/expenses/summary");
  if (!res.ok) throw new Error(`Failed to fetch summary: ${res.status}`);
  return res.json();
}
