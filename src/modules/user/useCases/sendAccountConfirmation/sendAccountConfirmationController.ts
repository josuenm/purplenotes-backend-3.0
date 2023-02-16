import { NextFunction, Request, Response } from "express";
import { SendAccountConfirmationUseCase } from "./sendAccountConfirmationUseCase";

class SendAccountConfirmationController {
  constructor(
    private sendAccountConfirmationUseCase: SendAccountConfirmationUseCase
  ) {}

  public async handle(req: Request, res: Response, next: NextFunction) {
    try {
      await this.sendAccountConfirmationUseCase.execute(req.user);
      res.send();
    } catch (e) {
      next(e);
    }
  }
}

export { SendAccountConfirmationController };
