import { FilterQuery, QueryOptions } from "mongoose";
import { CreateNoteDTO } from "../../../services/zod/note/create-note-validation";
import Note, { NoteDocument } from "../entities/Note";
import { INoteRepository } from "./implementations/INoteRepository";

class NoteRepository implements INoteRepository {
  public async findOne(
    query: FilterQuery<NoteDocument>,
    options?: QueryOptions
  ) {
    return await Note.findOne(query, null, options);
  }

  public async findAll(
    query: FilterQuery<NoteDocument>,
    options?: QueryOptions
  ) {
    return await Note.find(query, null, options);
  }

  public create(id: string, note: CreateNoteDTO) {
    return new Note({ ...note, author: id });
  }

  public async save(note: NoteDocument) {
    return await note.save();
  }

  public async delete(note: NoteDocument) {
    await note.delete();
  }

  public async update(id: string, note: NoteDocument) {
    return await Note.findOneAndUpdate(
      { _id: id },
      {
        $set: note,
      },
      { upsert: true, returnOriginal: false }
    );
  }
}

export { NoteRepository };
