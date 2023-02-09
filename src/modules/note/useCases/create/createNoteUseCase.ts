import createHttpError from "http-errors";
import { validateNewNote } from "../../../../services/joi";
import { User } from "../../../user/entities/User";
import { INoteRepository } from "../../repositories/implementations/INoteRepository";
import { NewNoteDTO } from "../../types/NoteProps";

class CreateNoteUseCase {
  constructor(private noteRepository: INoteRepository) {}

  public async execute(user: User, note: NewNoteDTO) {
    const { error, value } = validateNewNote(note);

    if (error) {
      throw createHttpError(401, "Fields are invalid");
    }

    const noteCreated = this.noteRepository.create({
      ...value,
      title: value.title || "New note",
      author: user.id,
    });
    return await this.noteRepository.save(noteCreated);
  }
}

export { CreateNoteUseCase };
