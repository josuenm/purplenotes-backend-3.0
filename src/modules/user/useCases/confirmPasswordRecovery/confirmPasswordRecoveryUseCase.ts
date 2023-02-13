import createHttpError from "http-errors";
import validate from "../../../../services/zod/user/password-validation";
import { IPasswordRecoveryRepository } from "../../repositories/implementations/IPasswordRecoveryRepository";
import { IUserRepository } from "../../repositories/implementations/IUserRepository";

class ConfirmPasswordRecoveryUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordRecoveryRepository: IPasswordRecoveryRepository
  ) {}

  public async execute(id: string, password: string) {
    const validation = validate({ password });
    const values = validation.data;

    if (!validation.success) {
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

    const passwordIsEqual = await user.comparePassword(values.password);
    if (passwordIsEqual) {
      throw createHttpError(409, "You cannot use the current password");
    }

    await this.userRepository.update(user);
    await this.passwordRecoveryRepository.confirm(passwordRecovery);
  }
}

export { ConfirmPasswordRecoveryUseCase };
