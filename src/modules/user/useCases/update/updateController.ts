import { NextFunction, Request, Response } from "express";
import { UpdateUseCase } from "./updateUseCase";

class UpdateController {
  constructor(private updateUseCase: UpdateUseCase) {}

  public async handle(req: Request, res: Response, next: NextFunction) {}
}

export { UpdateController };
