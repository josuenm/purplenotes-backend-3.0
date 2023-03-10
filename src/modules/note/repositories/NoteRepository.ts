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

  public async deleteAll(author: string) {
    await Note.deleteMany({ author });
  }

  public async update(note: NoteDocument) {
    return await this.save(note);
  }
}

export { NoteRepository };
