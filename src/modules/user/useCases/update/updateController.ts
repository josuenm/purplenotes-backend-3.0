import { NextFunction, Request, Response } from "express";
import { UpdateUseCase } from "./updateUseCase";

class UpdateController {
  constructor(private updateUseCase: UpdateUseCase) {}

  public async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.updateUseCase.execute(req.user, req.body);
      res.json(user);
    } catch (e) {
      next(e);
    }
  }
}

export { UpdateController };
