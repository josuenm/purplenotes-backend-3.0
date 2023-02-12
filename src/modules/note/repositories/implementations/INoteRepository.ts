import { FilterQuery, QueryOptions } from "mongoose";
import { NoteDocument } from "../../entities/Note";
import { NewNoteDTO } from "../../types/NoteProps";

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
  create: (note: NewNoteDTO) => NoteDocument;
  delete: (note: NoteDocument) => Promise<void>;
  update: (note: NoteDocument) => Promise<NoteDocument>;
}

export { INoteRepository };
