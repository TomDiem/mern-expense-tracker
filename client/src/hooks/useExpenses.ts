import { useEffect, useState } from "react";
import {
  fetchExpenses,
  createExpense,
  deleteExpense,
  fetchSummary,
} from "../api/expenses";
import type { NewExpense } from "../api/expenses";
import type { ExpenseDto, CategorySummary } from "@expense-tracker/shared";

export function useExpenses() {
  const [expenses, setExpenses] = useState<ExpenseDto[]>([]);
  const [summary, setSummary] = useState<CategorySummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function reload() {
    const [expensesData, summaryData] = await Promise.all([
      fetchExpenses(),
      fetchSummary(),
    ]);
    setExpenses(expensesData);
    setSummary(summaryData);
  }

  useEffect(() => {
    reload()
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Unknown error"),
      )
      .finally(() => setLoading(false));
  }, []);

  async function create(input: NewExpense) {
    await createExpense(input);
    await reload();
  }

  async function remove(id: string) {
    await deleteExpense(id);
    await reload();
  }

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return { expenses, summary, loading, error, total, create, remove };
}
