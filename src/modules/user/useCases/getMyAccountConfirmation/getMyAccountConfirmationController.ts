import { NextFunction, Request, Response } from "express";
import { GetMyAccountConfirmationUseCase } from "./getMyAccountConfirmationUseCase";

class GetMyAccountConfirmationController {
  constructor(
    private getMyAccountConfirmationUseCase: GetMyAccountConfirmationUseCase
  ) {}

  public async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const accountConfirmation =
        await this.getMyAccountConfirmationUseCase.execute(req.user);
      res.json(accountConfirmation);
    } catch (e) {
      next(e);
    }
  }
}

export { GetMyAccountConfirmationController };
