import createHttpError from "http-errors";
import validate, {
  CreateNoteDTO,
} from "../../../../services/zod/note/create-note-validation";
import { UserDocument } from "../../../user/entities/User";
import { INoteRepository } from "../../repositories/implementations/INoteRepository";

class CreateNoteUseCase {
  constructor(private noteRepository: INoteRepository) {}

  public async execute(user: UserDocument, data: CreateNoteDTO) {
    const validation = validate(data);

    if (!validation.success) {
      throw createHttpError(401, "Fields are invalid");
    }

    const noteCreated = this.noteRepository.create(user._id, {
      title: "New note",
      body: "<p>New note</p>",
      privacy: true,
    });
    return await this.noteRepository.save(noteCreated);
  }
}

export { CreateNoteUseCase };
