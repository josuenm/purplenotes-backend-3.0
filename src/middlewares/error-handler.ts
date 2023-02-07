import { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";

const errorHandler = (
  error: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(error.status || 500);
  res.send(error.message);
};

export { errorHandler };
