import { NoteRepository } from "../../repositories/NoteRepository";
import { CreateNoteController } from "./createNoteController";
import { CreateNoteUseCase } from "./createNoteUseCase";

const noteRepository = new NoteRepository();

const createNoteUseCase = new CreateNoteUseCase(noteRepository);

const createNoteController = new CreateNoteController(createNoteUseCase);

export { createNoteController };
