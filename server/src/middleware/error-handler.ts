import mongoose from "mongoose";
import { ZodError } from "zod";
import type { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof ZodError) {
    res.status(400).json({ error: "Validation failed", issues: err.issues });
    return;
  }
  if (err instanceof SyntaxError && "status" in err) {
    res.status(400).json({ error: "Invalid JSON body" });
    return;
  }
  if (err instanceof mongoose.Error.CastError) {
    res.status(400).json({ error: "Invalid id format" });
    return;
  }
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
}
