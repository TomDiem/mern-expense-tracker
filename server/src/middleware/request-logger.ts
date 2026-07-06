import type { Request, Response, NextFunction } from "express";

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const start = performance.now();

  res.on("finish", () => {
    const ms = (performance.now() - start).toFixed(1);
    console.log(`${req.method} ${req.originalUrl} ${res.statusCode} - ${ms}ms`);
  });

  next();
}
