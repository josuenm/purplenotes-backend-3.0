import { NextFunction, Request, Response } from "express";
import { CreatePasswordRecoveryUseCase } from "./createPasswordRecoveryUseCase";

class CreatePasswordRecoveryController {
  constructor(
    private createPasswordRecoveryUseCase: CreatePasswordRecoveryUseCase
  ) {}

  public async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const passwordRecovery = await this.createPasswordRecoveryUseCase.execute(
        req.body.email
      );
      res.json(passwordRecovery);
    } catch (e) {
      next(e);
    }
  }
}

export { CreatePasswordRecoveryController };
