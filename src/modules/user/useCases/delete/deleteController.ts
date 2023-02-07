import { NextFunction, Request, Response } from "express";
import { DeleteUseCase } from "./deleteUseCase";

class DeleteController {
  constructor(private deleteUseCase: DeleteUseCase) {}

  public async handle(req: Request, res: Response, next: NextFunction) {
    try {
      await this.deleteUseCase.execute(req.user, req.body.password);
      res.status(201).send();
    } catch (e) {
      next(e);
    }
  }
}

export { DeleteController };
