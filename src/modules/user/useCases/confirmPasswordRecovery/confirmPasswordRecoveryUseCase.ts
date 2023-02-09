import bcrypt from "bcrypt";
import createHttpError from "http-errors";
import { IPasswordRecoveryRepository } from "../../repositories/implementations/IPasswordRecoveryRepository";
import { IUserRepository } from "../../repositories/implementations/IUserRepository";

class ConfirmPasswordRecoveryUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordRecoveryRepository: IPasswordRecoveryRepository
  ) {}

  public async execute(id: string, newPassword: string) {
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
      where: { id: passwordRecovery.user },
    });

    if (!user) {
      throw createHttpError(401, "User not found");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 8);

    await this.userRepository.save({ ...user, password: hashedPassword });
    await this.passwordRecoveryRepository.confirm(passwordRecovery);
  }
}

export { ConfirmPasswordRecoveryUseCase };

