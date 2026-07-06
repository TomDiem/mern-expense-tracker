import type { ExpenseDto } from "@expense-tracker/shared";
import { CATEGORY_STYLES } from "../lib/categoryStyles";

const dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

type Props = {
  expenses: ExpenseDto[];
  onDelete: (id: string) => void;
};

export function ExpenseList({ expenses, onDelete }: Props) {
  if (expenses.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-zinc-200 py-10 text-center text-sm text-zinc-400">
        No expenses yet. Add your first one above.
      </p>
    );
  }

  return (
    <table className="w-full text-left text-sm">
      <thead>
        <tr className="text-xs uppercase tracking-wide text-zinc-400">
          <th className="py-2 font-medium">Description</th>
          <th className="py-2 font-medium">Category</th>
          <th className="py-2 font-medium">Date</th>
          <th className="py-2 text-right font-medium">Amount</th>
          <th className="w-8" />
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense) => (
          <tr
            key={expense._id}
            className="border-t border-zinc-100 transition hover:bg-amber-50/60"
          >
            <td className="py-3 font-medium">{expense.description}</td>
            <td className="py-3">
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${CATEGORY_STYLES[expense.category]}`}
              >
                {expense.category}
              </span>
            </td>
            <td className="py-3 text-zinc-500">
              {dateFormat.format(new Date(expense.date))}
            </td>
            <td className="py-3 text-right font-semibold">
              ${expense.amount.toLocaleString()}
            </td>
            <td className="py-3 text-right">
              <button
                onClick={() => onDelete(expense._id)}
                aria-label={`Delete ${expense.description}`}
                className="text-zinc-300 transition hover:text-red-500"
              >
                ✕
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
