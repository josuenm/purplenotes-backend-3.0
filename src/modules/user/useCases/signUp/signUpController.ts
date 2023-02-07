import { NextFunction, Request, Response } from "express";
import { SignUpUseCase } from "./signUpUseCase";

class SignUpController {
  constructor(private signUpUseCase: SignUpUseCase) {}

  public async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.signUpUseCase.execute(req.body);
      res.status(201).json(user);
    } catch (e) {
      next(e);
    }
  }
}

export { SignUpController };
