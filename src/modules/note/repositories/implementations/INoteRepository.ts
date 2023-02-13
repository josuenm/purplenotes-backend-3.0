import { FilterQuery, QueryOptions } from "mongoose";
import { CreateNoteDTO } from "../../../../services/zod/note/create-note-validation";
import { NoteDocument } from "../../entities/Note";

interface INoteRepository {
  findOne: (
    query: FilterQuery<NoteDocument>,
    options?: QueryOptions
  ) => Promise<NoteDocument | null>;
  findAll: (
    query: FilterQuery<NoteDocument>,
    options?: QueryOptions
  ) => Promise<NoteDocument[] | []>;
  save: (note: NoteDocument) => Promise<NoteDocument>;
  create: (id: string, note: CreateNoteDTO) => NoteDocument;
  delete: (note: NoteDocument) => Promise<void>;
  update: (note: NoteDocument) => Promise<NoteDocument>;
}

export { INoteRepository };
