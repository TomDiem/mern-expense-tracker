import express from "express";
import mongoose from "mongoose";
import { expenseRouter } from "./routes/expense.routes.js";
import { connectDB } from "./config/db.js";
import { errorHandler } from "./middleware/error-handler.js";
import { requestLogger } from "./middleware/request-logger.js";

const PORT = process.env.PORT ?? 3000;
const MONGODB_URI =
  process.env.MONGODB_URI ?? "mongodb://localhost:27017/expense-tracker";

const app = express();

app.use(requestLogger);
app.use(express.json());
app.get("/api/health", (_, res) => {
  res.json({ status: "ok", db: mongoose.connection.readyState === 1 });
});
app.use("/api/expenses", expenseRouter);
app.use(errorHandler);

await connectDB(MONGODB_URI);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
