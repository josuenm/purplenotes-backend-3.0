import createHttpError from "http-errors";
import { INoteRepository } from "../../repositories/implementations/INoteRepository";

class GetMyNoteUseCase {
  constructor(private noteRepository: INoteRepository) {}

  public async execute(token: string) {
    if (!token) {
      throw createHttpError(401, "Field are required");
    }

    const note = await this.noteRepository.findOne({
      where: {
        token,
      },
    });

    if (!note) {
      throw createHttpError(404, "Note not found");
    }

    return note;
  }
}

export { GetMyNoteUseCase };
