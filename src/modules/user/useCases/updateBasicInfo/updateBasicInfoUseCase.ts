import createHttpError from "http-errors";
import validate, {
  BasicInfoDTO,
} from "../../../../services/zod/user/update-basic-info-validation";
import { UserDocument } from "../../entities/User";
import { IUserRepository } from "../../repositories/implementations/IUserRepository";

class UpdateBasicInfoUseCase {
  constructor(private userRepository: IUserRepository) {}

  public async execute(user: UserDocument, data: BasicInfoDTO) {
    const validation = validate(data);
    const values = validation.data;

    if (!validation.success) {
      throw createHttpError(401, "Fields are invalid");
    }

    user.name = values.name;

    if (user.email !== values.email) {
      user.accountConfirmation = {
        email: values.email,
        isUsed: false,
      };
    }

    return await this.userRepository.update(user._id, user);
  }
}

export { UpdateBasicInfoUseCase };
