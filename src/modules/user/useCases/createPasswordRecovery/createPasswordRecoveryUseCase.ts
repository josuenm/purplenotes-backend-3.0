import createHttpError from "http-errors";
import { IPasswordRecoveryRepository } from "../../repositories/implementations/IPasswordRecoveryRepository";
import { IUserRepository } from "../../repositories/implementations/IUserRepository";

class CreatePasswordRecoveryUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordRecoveryRepository: IPasswordRecoveryRepository
  ) {}

  public async execute(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw createHttpError(404, "User not found");
    }

    const passwordRecovery = this.passwordRecoveryRepository.create({
      email,
      user: user.id,
    });

    return await this.passwordRecoveryRepository.save(passwordRecovery);
  }
}

export { CreatePasswordRecoveryUseCase };
