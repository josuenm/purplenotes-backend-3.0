import { UserDocument } from "../../../user/entities/User";
import { INoteRepository } from "../../repositories/implementations/INoteRepository";

class GetAllMyNotesUseCase {
  constructor(private noteRepository: INoteRepository) {}

  public async execute(user: UserDocument) {
    return await this.noteRepository.findAll({
      where: {
        author: user._id,
      },
    });
  }
}

export { GetAllMyNotesUseCase };
