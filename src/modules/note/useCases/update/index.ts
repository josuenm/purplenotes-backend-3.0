import { NoteRepository } from "../../repositories/NoteRepository";
import { UpdateNoteController } from "./updateNoteController";
import { UpdateNoteUseCase } from "./updateNoteUseCase";

const noteRepository = new NoteRepository();

const updateNoteUseCase = new UpdateNoteUseCase(noteRepository);

const updateNoteController = new UpdateNoteController(updateNoteUseCase);

export { updateNoteController };
