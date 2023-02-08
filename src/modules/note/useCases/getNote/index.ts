import { NoteRepository } from "../../repositories/NoteRepository";
import { GetNoteController } from "./getNoteController";
import { GetNoteUseCase } from "./getNoteUseCase";

const noteRepository = new NoteRepository();

const getNoteUseCase = new GetNoteUseCase(noteRepository);

const getNoteController = new GetNoteController(getNoteUseCase);

export { getNoteController };
