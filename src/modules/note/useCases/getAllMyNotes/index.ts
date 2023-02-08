import { NoteRepository } from "../../repositories/NoteRepository";
import { GetAllMyNotesController } from "./getAllMyNotesController";
import { GetAllMyNotesUseCase } from "./getAllMyNotesUseCase";

const noteRepository = new NoteRepository();

const getAllMyNotesUseCase = new GetAllMyNotesUseCase(noteRepository);

const getAllMyNotesController = new GetAllMyNotesController(
  getAllMyNotesUseCase
);

export { getAllMyNotesController };
