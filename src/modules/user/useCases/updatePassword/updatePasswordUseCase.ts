import createHttpError from "http-errors";
import validate from "../../../../services/zod/user/password-validation";
import { UserDocument } from "../../entities/User";
import { IUserRepository } from "../../repositories/implementations/IUserRepository";

class UpdatePasswordUseCase {
  constructor(private userRepository: IUserRepository) {}

  public async execute(user: UserDocument, password: string) {
    const validation = validate({ password });
    const values = validation.data;

    if (!validation.success) {
      throw createHttpError(401, "Field are invalid");
    }

    const passwordIsEqual = await user.comparePassword(values.password);

    if (passwordIsEqual) {
      return user;
    }

    user.password = values.password;
    return await this.userRepository.update(user);
  }
}

export { UpdatePasswordUseCase };
