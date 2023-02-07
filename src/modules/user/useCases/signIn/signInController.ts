import { NextFunction, Request, Response } from "express";
import { SignInUseCase } from "./signInUseCase";

class SignInController {
  constructor(private signInUseCase: SignInUseCase) {}

  public async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.signInUseCase.execute(req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  }
}

export { SignInController };
