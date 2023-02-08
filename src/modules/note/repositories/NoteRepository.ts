import { FindManyOptions, FindOneOptions, Repository } from "typeorm";
import { AppDataSource } from "../../../config/mongodb/data-source";
import { Note } from "../entities/Note";
import { NewNoteDTO } from "../types/NoteProps";
import { INoteRepository } from "./implementations/INoteRepository";

class NoteRepository implements INoteRepository {
  private static repo: Repository<Note>;

  constructor() {
    if (!NoteRepository.repo) {
      NoteRepository.repo = AppDataSource.getRepository(Note);
    }
  }

  public async findOne(where: FindOneOptions<Note>) {
    return await NoteRepository.repo.findOne(where);
  }

  public async findAll(where: FindManyOptions<Note>) {
    return await NoteRepository.repo.find(where);
  }

  public create(note: NewNoteDTO) {
    return NoteRepository.repo.create(note);
  }

  public async save(note: Note) {
    return await NoteRepository.repo.save(note);
  }

  public async delete(token: string) {
    await NoteRepository.repo.delete({ token });
  }
}

export { NoteRepository };
