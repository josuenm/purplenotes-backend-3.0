import createHttpError from "http-errors";
import { IPasswordRecoveryRepository } from "../../repositories/implementations/IPasswordRecoveryRepository";

class GetPasswordRecoveryUseCase {
  constructor(
    private passwordRecoveryRepository: IPasswordRecoveryRepository
  ) {}

  public async execute(id: string) {
    if (!id) throw createHttpError(401, "Id are required");

    const data = await this.passwordRecoveryRepository.findOne({ _id: id });

    if (!data) throw createHttpError(404, "Password recovery not found");

    return data;
  }
}

export { GetPasswordRecoveryUseCase };
