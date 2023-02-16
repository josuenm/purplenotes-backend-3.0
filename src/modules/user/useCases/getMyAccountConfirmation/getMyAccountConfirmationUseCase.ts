import { UserDocument } from "../../entities/User";

class GetMyAccountConfirmationUseCase {
  public async execute(user: UserDocument) {
    return user.accountConfirmation;
  }
}

export { GetMyAccountConfirmationUseCase };
