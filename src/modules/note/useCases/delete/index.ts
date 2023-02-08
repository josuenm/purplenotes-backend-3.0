import { NoteRepository } from "../../repositories/NoteRepository";
import { DeleteNoteController } from "./deleteNoteController";
import { DeleteNoteUseCase } from "./deleteNoteUseCase";

const noteRepository = new NoteRepository();

const deleteNoteUseCase = new DeleteNoteUseCase(noteRepository);

const deleteNoteController = new DeleteNoteController(deleteNoteUseCase);

export { deleteNoteController };
