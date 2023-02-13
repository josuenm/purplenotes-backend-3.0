import "dotenv/config";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import validate, {
  SignInDTO,
} from "../../../../services/zod/user/sign-in-validation";
import { IUserRepository } from "../../repositories/implementations/IUserRepository";

class SignInUseCase {
  constructor(private userRepository: IUserRepository) {}

  public async execute(data: SignInDTO) {
    const validation = validate(data);
    const values = validation.data;

    if (!validation.success) {
      throw createHttpError(401, "Fields are invalid");
    }

    const user = await this.userRepository.findOne({
      email: values.email,
    });

    if (!user) {
      throw createHttpError(404, "User not found");
    }

    const passwordIsEqual = await user.comparePassword(values.password);

    if (!passwordIsEqual) {
      throw createHttpError(401, "Email or password is incorrect");
    }

    const token = jwt.sign(
      { id: user._id },
      JSON.stringify(process.env.JWT_SECRET),
      {
        expiresIn: "30d",
      }
    );

    return {
      user: {
        email: user.email,
        name: user.name,
        accountConfirmation: user.accountConfirmation,
      },
      token,
    };
  }
}

export { SignInUseCase };
