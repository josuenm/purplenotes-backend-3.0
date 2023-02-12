import createHttpError from "http-errors";
import { validateCreatePasswordRecovery } from "../../../../services/joi";
import { IPasswordRecoveryRepository } from "../../repositories/implementations/IPasswordRecoveryRepository";
import { IUserRepository } from "../../repositories/implementations/IUserRepository";

class CreatePasswordRecoveryUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordRecoveryRepository: IPasswordRecoveryRepository
  ) {}

  public async execute(email: string) {
    const { error, value } = validateCreatePasswordRecovery(email);

    if (error) {
      throw createHttpError(401, "Field are invalid");
    }

    const user = await this.userRepository.findOne({
      where: { email: value },
    });

    if (!user) {
      throw createHttpError(404, "User not found");
    }

    const passwordRecovery = this.passwordRecoveryRepository.create({
      email: value,
      author: user.id,
    });

    return await this.passwordRecoveryRepository.save(passwordRecovery);
  }
}

export { CreatePasswordRecoveryUseCase };
