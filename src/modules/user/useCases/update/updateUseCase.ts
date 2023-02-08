import bcrypt from "bcrypt";
import createHttpError from "http-errors";
import { validateUserUpdate } from "../../../../services/joi";
import { User } from "../../models/User";
import { IUserRepository } from "../../repositories/implementations/IUserRepository";
import { UserUpdateDTO } from "../../types/UserProps";

class UpdateUseCase {
  constructor(private userRepository: IUserRepository) {}

  public async execute(user: User, updates: UserUpdateDTO) {
    const { error, value } = validateUserUpdate(updates);

    if (error) {
      throw createHttpError(401, "Fields are invalid");
    }

    const passwordIsEqual = await bcrypt.compare(
      updates.password,
      user.password
    );

    if (!passwordIsEqual) {
      const hashedPassword = await bcrypt.hash(updates.password, 8);
      value.password = hashedPassword;
    } else {
      value.password = user.password;
    }

    return await this.userRepository.save({
      ...user,
      ...value,
      updated_at: new Date(),
    });
  }
}

export { UpdateUseCase };
