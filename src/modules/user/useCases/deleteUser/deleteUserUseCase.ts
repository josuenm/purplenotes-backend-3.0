import createHttpError from "http-errors";
import { UserDocument } from "../../entities/User";
import { IUserRepository } from "../../repositories/implementations/IUserRepository";

class DeleteUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  public async execute(user: UserDocument, password: string) {
    if (!user.comparePassword(password)) {
      throw createHttpError(401, "Incorrect password");
    }

    await this.userRepository.delete(user);
  }
}

export { DeleteUserUseCase };
