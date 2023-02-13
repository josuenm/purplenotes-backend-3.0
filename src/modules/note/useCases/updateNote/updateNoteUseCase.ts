import createHttpError from "http-errors";
import validate, {
  UpdateNoteDTO,
} from "../../../../services/zod/note/update-note-validation";
import { INoteRepository } from "../../repositories/implementations/INoteRepository";

class UpdateNoteUseCase {
  constructor(private noteRepository: INoteRepository) {}

  public async execute(id: string, data: UpdateNoteDTO) {
    const validation = validate(data);
    const values = validation.data;

    if (!validation.success) {
      throw createHttpError(401, "Fields are invalid");
    }

    const note = await this.noteRepository.findOne({ where: { _id: id } });

    if (!note) {
      throw createHttpError(404, "Note not found");
    }

    if (
      note.title === values.title &&
      note.body === values.body &&
      note.privacy === values.privacy
    ) {
      return note;
    }

    (note.title = values.title), (note.body = values.body);
    note.privacy = values.privacy;

    const noteUpdated = await this.noteRepository.update(note._id, note);

    return noteUpdated;
  }
}

export { UpdateNoteUseCase };
