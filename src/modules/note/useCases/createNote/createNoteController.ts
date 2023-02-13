import { NextFunction, Request, Response } from "express";
import { CreateNoteUseCase } from "./createNoteUseCase";

class CreateNoteController {
  constructor(private createNoteUseCase: CreateNoteUseCase) {}

  public async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const note = await this.createNoteUseCase.execute(req.user, req.body);
      res.status(201).json(note);
    } catch (e) {
      next(e);
    }
  }
}

export { CreateNoteController };
