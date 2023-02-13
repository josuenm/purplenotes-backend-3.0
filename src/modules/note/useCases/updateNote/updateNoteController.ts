import { NextFunction, Request, Response } from "express";
import { UpdateNoteUseCase } from "./updateNoteUseCase";

class UpdateNoteController {
  constructor(private updateNoteUseCase: UpdateNoteUseCase) {}

  public async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const noteUpdated = await this.updateNoteUseCase.execute(
        req.params.id,
        req.body
      );

      res.json(noteUpdated);
    } catch (e) {
      next(e);
    }
  }
}

export { UpdateNoteController };
