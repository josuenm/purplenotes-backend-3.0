import { NextFunction, Request, Response } from "express";
import { UpdateBasicInfoUseCase } from "./updateBasicInfoUseCase";

class UpdateBasicInfoController {
  constructor(private updateBasicInfoUseCase: UpdateBasicInfoUseCase) {}

  public async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.updateBasicInfoUseCase.execute(
        req.user,
        req.body
      );
      res.json(user);
    } catch (e) {
      next(e);
    }
  }
}

export { UpdateBasicInfoController };
