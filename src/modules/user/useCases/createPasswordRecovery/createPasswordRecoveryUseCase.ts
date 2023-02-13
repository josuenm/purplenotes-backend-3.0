import createHttpError from "http-errors";
import validate from "../../../../services/zod/user/create-password-recovery-validation";
import { IPasswordRecoveryRepository } from "../../repositories/implementations/IPasswordRecoveryRepository";
import { IUserRepository } from "../../repositories/implementations/IUserRepository";

class CreatePasswordRecoveryUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordRecoveryRepository: IPasswordRecoveryRepository
  ) {}

  public async execute(email: string) {
    const validation = validate({ email });
    const values = validation.data;

    if (!validation.success) {
      throw createHttpError(401, "Field are invalid");
    }

    const user = await this.userRepository.findOne({
      where: { email: values.email },
    });

    if (!user) {
      throw createHttpError(404, "User not found");
    }

    const passwordRecovery = this.passwordRecoveryRepository.create({
      email: values.email,
      author: user.id,
    });

    return await this.passwordRecoveryRepository.save(passwordRecovery);
  }
}

export { CreatePasswordRecoveryUseCase };
