import { useExpenses } from "./hooks/useExpenses";
import { ExpenseForm } from "./components/ExpenseForm";
import { ExpenseList } from "./components/ExpenseList";
import { CategorySummary } from "./components/CategorySummary";

function App() {
  const { expenses, summary, loading, error, total, create, remove } =
    useExpenses();

  return (
    <div className="min-h-dvh bg-zinc-200/70 px-4 py-10 font-sans text-zinc-900">
      <main className="mx-auto max-w-3xl overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-black/5">
        <header className=" px-8 pt-8 pb-6">
          <h1 className="text-3xl font-semibold tracking-tight">Expenses</h1>
          <div className="mt-4 flex gap-2">
            <span className="rounded-full bg-zinc-900 px-4 py-1.5 text-sm font-medium text-white">
              {expenses.length} items
            </span>
            <span className="rounded-full bg-accent px-4 py-1.5 text-sm font-semibold">
              Total ${total.toLocaleString()}
            </span>
          </div>
        </header>

        <section className="px-8 pb-8">
          {loading && (
            <p className="py-8 text-center text-zinc-400">Loading...</p>
          )}
          {error && (
            <p className="py-8 text-center text-red-500">Error: {error}</p>
          )}
          {!loading && !error && (
            <>
              <ExpenseForm onCreate={create} />
              <CategorySummary summary={summary} />
              <ExpenseList expenses={expenses} onDelete={remove} />
            </>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
