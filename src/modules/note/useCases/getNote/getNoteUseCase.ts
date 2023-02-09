import createHttpError from "http-errors";
import { INoteRepository } from "../../repositories/implementations/INoteRepository";

class GetNoteUseCase {
  constructor(private noteRepository: INoteRepository) {}

  public async execute(id: string) {
    if (!id) {
      throw createHttpError(401, "Field are required");
    }

    const note = await this.noteRepository.findOne({
      where: {
        id,
      },
    });

    if (!note) {
      throw createHttpError(404, "Note not found");
    }

    if (note.privacy) {
      throw createHttpError(
        401,
        "You do not have permission to read this note"
      );
    }

    return note;
  }
}

export { GetNoteUseCase };
