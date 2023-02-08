import { FindManyOptions, FindOneOptions } from "typeorm";
import { Note } from "../../entities/Note";
import { NewNoteDTO } from "../../types/NoteProps";

interface INoteRepository {
  findOne: (where: FindOneOptions<Note>) => Promise<Note | null>;
  findAll: (where: FindManyOptions<Note>) => Promise<Note[] | []>;
  save: (note: Note) => Promise<Note>;
  create: (note: NewNoteDTO) => Note;
  delete: (id: string) => Promise<void>;
}

export { INoteRepository };
