import bcrypt from "bcrypt";
import createHttpError from "http-errors";
import { User } from "../../models/User";
import { IUserRepository } from "../../repositories/implementations/IUserRepository";

class DeleteUseCase {
  constructor(private userRepository: IUserRepository) {}

  public async execute(user: User, password: string) {
    const passwordIsEqual = await bcrypt.compare(password, user.password);

    if (!passwordIsEqual) {
      throw createHttpError(401, "Incorrect password");
    }

    await this.userRepository.delete(user.email);
  }
}

export { DeleteUseCase };
