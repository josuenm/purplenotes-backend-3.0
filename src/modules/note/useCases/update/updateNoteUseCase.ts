import createHttpError from "http-errors";
import { validateNoteUpdate } from "../../../../services/joi";
import { INoteRepository } from "../../repositories/implementations/INoteRepository";
import { UpdateNoteDTO } from "../../types/NoteProps";

class UpdateNoteUseCase {
  constructor(private noteRepository: INoteRepository) {}

  public async execute(id: string, updates: UpdateNoteDTO) {
    const { error, value } = validateNoteUpdate(updates);

    if (error) {
      throw createHttpError(401, "Fields are invalid");
    }

    const note = await this.noteRepository.findOne({ where: { id } });

    if (!note) {
      throw createHttpError(404, "Note not found");
    }

    const noteUpdated = await this.noteRepository.save({
      ...note,
      ...value,
      updated_at: new Date(),
    });

    return noteUpdated;
  }
}

export { UpdateNoteUseCase };
