import createHttpError from "http-errors";
import { INoteRepository } from "../../../note/repositories/implementations/INoteRepository";
import { UserDocument } from "../../entities/User";
import { IUserRepository } from "../../repositories/implementations/IUserRepository";

class DeleteUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private noteRepository: INoteRepository
  ) {}

  public async execute(user: UserDocument, password: string) {
    if (!user.comparePassword(password)) {
      throw createHttpError(401, "Incorrect password");
    }

    const passwordIsEqual = await user.comparePassword(password);

    if (!passwordIsEqual) {
      throw createHttpError(401, "Incorrect password");
    }

    await this.noteRepository.deleteAll(user._id);
    await this.userRepository.delete(user);
  }
}

export { DeleteUserUseCase };
