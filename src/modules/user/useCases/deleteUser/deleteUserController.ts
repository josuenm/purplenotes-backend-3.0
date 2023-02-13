import { NextFunction, Request, Response } from "express";
import { DeleteUserUseCase } from "./deleteUserUseCase";

class DeleteUserController {
  constructor(private deleteUserUseCase: DeleteUserUseCase) {}

  public async handle(req: Request, res: Response, next: NextFunction) {
    try {
      await this.deleteUserUseCase.execute(req.user, req.body.password);
      res.status(201).send();
    } catch (e) {
      next(e);
    }
  }
}

export { DeleteUserController };
