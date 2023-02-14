import { NextFunction, Request, Response } from "express";
import { SendPasswordRecoveryUseCase } from "./sendPasswordRecoveryUseCase";

class SendPasswordRecoveryController {
  constructor(
    private sendPasswordRecoveryUseCase: SendPasswordRecoveryUseCase
  ) {}

  public async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const passwordRecovery = await this.sendPasswordRecoveryUseCase.execute(
        req.body.email
      );
      res.json(passwordRecovery);
    } catch (e) {
      next(e);
    }
  }
}

export { SendPasswordRecoveryController };
