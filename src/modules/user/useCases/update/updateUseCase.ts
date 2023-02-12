import createHttpError from "http-errors";
import { validateUserUpdate } from "../../../../services/joi";
import { UserDocument } from "../../entities/User";
import { IUserRepository } from "../../repositories/implementations/IUserRepository";
import { UserUpdateDTO } from "../../types/UserProps";

class UpdateUseCase {
  constructor(private userRepository: IUserRepository) {}

  public async execute(user: UserDocument, updates: UserUpdateDTO) {
    const { error, value } = validateUserUpdate(updates);

    if (error) {
      throw createHttpError(401, "Fields are invalid");
    }

    return await this.userRepository.update({
      ...user,
      ...value,
      updated_at: new Date(),
    });
  }
}

export { UpdateUseCase };
