import { NextFunction, Request, Response } from "express";
import { UpdatePasswordUseCase } from "./updatePasswordUseCase";

class UpdatePasswordController {
  constructor(private updatePasswordUseCase: UpdatePasswordUseCase) {}

  public async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.updatePasswordUseCase.execute(
        req.user,
        req.body.password
      );
      res.json(user);
    } catch (e) {
      next(e);
    }
  }
}

export { UpdatePasswordController };
