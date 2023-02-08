import { NoteRepository } from "../../repositories/NoteRepository";
import { GetMyNoteController } from "./getMyNoteController";
import { GetMyNoteUseCase } from "./getMyNoteUseCase";

const noteRepository = new NoteRepository();

const getMyNoteUseCase = new GetMyNoteUseCase(noteRepository);

const getMyNoteController = new GetMyNoteController(getMyNoteUseCase);

export { getMyNoteController };
