import createHttpError from "http-errors";
import { validateConfirmPasswordRecovery } from "../../../../services/joi";
import { IPasswordRecoveryRepository } from "../../repositories/implementations/IPasswordRecoveryRepository";
import { IUserRepository } from "../../repositories/implementations/IUserRepository";

class ConfirmPasswordRecoveryUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordRecoveryRepository: IPasswordRecoveryRepository
  ) {}

  public async execute(id: string, newPassword: string) {
    const { error, value } = validateConfirmPasswordRecovery(newPassword);

    if (error) {
      throw createHttpError(401, "Field are invalid");
    }

    const passwordRecovery = await this.passwordRecoveryRepository.findOne({
      where: { id },
    });

    if (!passwordRecovery) {
      throw createHttpError(404, "Password recovery not found");
    }

    if (Date.now() > passwordRecovery.expiryDate.getTime()) {
      throw createHttpError(401, "Password recovery time expired");
    }

    const user = await this.userRepository.findOne({
      where: { id: passwordRecovery.author },
    });

    if (!user) {
      throw createHttpError(401, "User not found");
    }

    await this.userRepository.save(user);
    await this.passwordRecoveryRepository.confirm(passwordRecovery);
  }
}

export { ConfirmPasswordRecoveryUseCase };
