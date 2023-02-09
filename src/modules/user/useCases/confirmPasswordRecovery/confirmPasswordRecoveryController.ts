import { NextFunction, Request, Response } from "express";
import { ConfirmPasswordRecoveryUseCase } from "./confirmPasswordRecoveryUseCase";

class confirmPasswordRecoveryController {
  constructor(
    private confirmPasswordRecoveryUseCase: ConfirmPasswordRecoveryUseCase
  ) {}

  public async handle(req: Request, res: Response, next: NextFunction) {
    try {
      await this.confirmPasswordRecoveryUseCase.execute(
        req.params.id,
        req.body.password
      );
      res.send();
    } catch (e) {
      next(e);
    }
  }
}

export { confirmPasswordRecoveryController };
