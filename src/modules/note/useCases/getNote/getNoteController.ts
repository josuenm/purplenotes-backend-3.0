import { NextFunction, Request, Response } from "express";
import { GetNoteUseCase } from "./getNoteUseCase";

class GetNoteController {
  constructor(private getNoteUseCase: GetNoteUseCase) {}

  public async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const note = await this.getNoteUseCase.execute(req.params.token);
      res.json(note);
    } catch (e) {
      next(e);
    }
  }
}

export { GetNoteController };
