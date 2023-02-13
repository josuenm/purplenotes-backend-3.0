import createHttpError from "http-errors";
import { IPasswordRecoveryRepository } from "../../repositories/implementations/IPasswordRecoveryRepository";
import { IUserRepository } from "../../repositories/implementations/IUserRepository";

class ConfirmPasswordRecoveryUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordRecoveryRepository: IPasswordRecoveryRepository
  ) {}

  public async execute(id: string, newPassword: string) {
    if (!newPassword) {
      throw createHttpError(401, "Field are invalid");
    }

    const passwordRecovery = await this.passwordRecoveryRepository.findOne({
      where: { id_: id },
    });

    if (!passwordRecovery) {
      throw createHttpError(404, "Password recovery not found");
    }

    if (Date.now() > passwordRecovery.expiryDate.getTime()) {
      throw createHttpError(401, "Password recovery time expired");
    }

    const user = await this.userRepository.findOne({
      where: { _id: passwordRecovery.author },
    });

    if (!user) {
      throw createHttpError(401, "User not found");
    }

    await this.userRepository.save(user);
    await this.passwordRecoveryRepository.confirm(passwordRecovery);
  }
}

export { ConfirmPasswordRecoveryUseCase };
