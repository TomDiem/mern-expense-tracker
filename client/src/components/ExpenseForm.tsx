import { useState } from "react";
import type { FormEvent } from "react";
import { CATEGORIES, type Category } from "@expense-tracker/shared";
import type { NewExpense } from "../api/expenses";

type Props = {
  onCreate: (input: NewExpense) => Promise<void>;
};

export function ExpenseForm({ onCreate }: Props) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<Category>("food");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    await onCreate({ description, amount: Number(amount), category });
    setDescription("");
    setAmount("");
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex flex-wrap gap-2">
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
        className="min-w-40 flex-1 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm outline-none transition focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-200"
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        required
        min="0.01"
        step="0.01"
        className="w-28 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm outline-none transition focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-200"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value as Category)}
        className="rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-amber-400"
      >
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 active:scale-95"
      >
        Add
      </button>
    </form>
  );
}
