import { User } from "../../../user/entities/User";
import { INoteRepository } from "../../repositories/implementations/INoteRepository";

class GetAllMyNotesUseCase {
  constructor(private noteRepository: INoteRepository) {}

  public async execute(user: User) {
    return await this.noteRepository.findAll({
      where: {
        author: user.token,
      },
    });
  }
}

export { GetAllMyNotesUseCase };
