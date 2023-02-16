import { NextFunction, Request, Response } from "express";
import { ConfirmAccountUseCase } from "./confirmAccountUseCase";

class ConfirmAccountController {
  constructor(private confirmAccountUseCase: ConfirmAccountUseCase) {}

  public async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.confirmAccountUseCase.execute(req.user);
      res.json(user);
    } catch (e) {
      next(e);
    }
  }
}

export { ConfirmAccountController };
