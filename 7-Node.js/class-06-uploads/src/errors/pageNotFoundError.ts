import { Request, Response, NextFunction } from "express";

type CustomError = {
  status?: number;
  message: string;
};

export function pageNotFoundError(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const error: CustomError = new Error("Page Not Found");
  error.status = 404;
  next(error);
}
