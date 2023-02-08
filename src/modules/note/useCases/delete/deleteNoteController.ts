import { NextFunction, Request, Response } from "express";
import { DeleteNoteUseCase } from "./deleteNoteUseCase";

class DeleteNoteController {
  constructor(private deleteNoteUseCase: DeleteNoteUseCase) {}

  public async handle(req: Request, res: Response, next: NextFunction) {
    try {
      await this.deleteNoteUseCase.execute(req.params.token);
      res.status(201).send();
    } catch (e) {
      next(e);
    }
  }
}

export { DeleteNoteController };
