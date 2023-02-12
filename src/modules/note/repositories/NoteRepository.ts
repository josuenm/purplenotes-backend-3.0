import { FilterQuery, QueryOptions } from "mongoose";
import Note, { NoteDocument } from "../entities/Note";
import { NewNoteDTO } from "../types/NoteProps";
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

  public create(note: NewNoteDTO) {
    return new Note(note);
  }

  public async save(note: NoteDocument) {
    return await note.save();
  }

  public async delete(note: NoteDocument) {
    await note.delete();
  }

  public async update(note: NoteDocument) {
    return await Note.findOneAndUpdate(
      { _id: note._id },
      { $set: { ...note } },
      { upsert: true, returnOriginal: false }
    );
  }
}

export { NoteRepository };
