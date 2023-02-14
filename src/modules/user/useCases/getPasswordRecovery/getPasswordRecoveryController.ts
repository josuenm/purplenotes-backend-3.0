import { NextFunction, Request, Response } from "express";
import { GetPasswordRecoveryUseCase } from "./getPasswordRecoveryUseCase";

class GetPasswordRecoveryController {
  constructor(private getPasswordRecoveryUseCase: GetPasswordRecoveryUseCase) {}

  public async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const data = this.getPasswordRecoveryUseCase.execute(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  }
}

export { GetPasswordRecoveryController };
