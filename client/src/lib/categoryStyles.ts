import type { Category } from "@expense-tracker/shared";

export const CATEGORY_STYLES: Record<Category, string> = {
  food: "bg-amber-100 text-amber-800",
  transport: "bg-sky-100 text-sky-800",
  entertainment: "bg-violet-100 text-violet-800",
  utilities: "bg-zinc-200 text-zinc-700",
  health: "bg-emerald-100 text-emerald-800",
  other: "bg-zinc-100 text-zinc-600",
};
