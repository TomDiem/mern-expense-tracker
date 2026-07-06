import type { CategorySummary as Summary } from "@expense-tracker/shared";
import { CATEGORY_STYLES } from "../lib/categoryStyles";

type Props = { summary: Summary[] };

export function CategorySummary({ summary }: Props) {
  if (summary.length === 0) return null;

  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {summary.map((item) => (
        <span
          key={item.category}
          className={`rounded-full px-3 py-1.5 text-xs font-medium ${CATEGORY_STYLES[item.category]}`}
        >
          {item.category} · ${item.total.toLocaleString()} ({item.count})
        </span>
      ))}
    </div>
  );
}
