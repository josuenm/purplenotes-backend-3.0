import { NextFunction, Request, Response } from "express";
import { GetAllMyNotesUseCase } from "./getAllMyNotesUseCase";

class GetAllMyNotesController {
  constructor(private getAllMyNotesUseCase: GetAllMyNotesUseCase) {}

  public async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const notes = await this.getAllMyNotesUseCase.execute(req.user);
      res.json(notes);
    } catch (e) {
      next(e);
    }
  }
}

export { GetAllMyNotesController };
