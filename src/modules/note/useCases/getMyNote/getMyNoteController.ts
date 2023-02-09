import { NextFunction, Request, Response } from "express";
import { GetMyNoteUseCase } from "./getMyNoteUseCase";

class GetMyNoteController {
  constructor(private getMyNoteUseCase: GetMyNoteUseCase) {}

  public async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const note = await this.getMyNoteUseCase.execute(req.params.id);
      res.json(note);
    } catch (e) {
      next(e);
    }
  }
}

export { GetMyNoteController };
