import createHttpError from "http-errors";
import { UserDocument } from "../../entities/User";
import { IUserRepository } from "../../repositories/implementations/IUserRepository";

class ConfirmAccountUseCase {
  constructor(private userRepository: IUserRepository) {}

  public async execute(user: UserDocument) {
    if (Date.now() > new Date(user.accountConfirmation.expiryDate).getTime()) {
      throw createHttpError(401, "Password confirmation time expired");
    }

    const email = user.accountConfirmation.email;
    user.accountConfirmation.isConfirmed = true;
    user.email = email;

    const userUpdated = await this.userRepository.update(user);
    return {
      accountConfirmation: userUpdated.accountConfirmation,
      name: userUpdated.name,
      email: userUpdated.email,
    };
  }
}

export { ConfirmAccountUseCase };
