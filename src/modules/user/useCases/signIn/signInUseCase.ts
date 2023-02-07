import bcrypt from "bcrypt";
import "dotenv/config";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { validateSignIn } from "../../../../services/joi";
import { IUserRepository } from "../../repositories/implementations/IUserRepository";
import { SignInDTO } from "../../types/UserProps";

class SignInUseCase {
  constructor(private userRepository: IUserRepository) {}

  public async execute(data: SignInDTO) {
    const { error, value } = validateSignIn(data);

    if (error) {
      throw createHttpError(401, "Fields are invalid");
    }

    const user = await this.userRepository.findOne({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      throw createHttpError(404, "User not found");
    }

    const passwordIsEqual = await bcrypt.compare(data.password, user.password);

    if (!passwordIsEqual) {
      throw createHttpError(401, "Email or password is incorrect");
    }

    const token = jwt.sign(
      { email: user.email },
      JSON.stringify(process.env.JWT_SECRET),
      {
        expiresIn: "30d",
      }
    );

    return { user, token };
  }
}

export { SignInUseCase };
