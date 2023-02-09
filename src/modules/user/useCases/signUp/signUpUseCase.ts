import "dotenv/config";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { validateSignUp } from "../../../../services/joi";
import { IUserRepository } from "../../repositories/implementations/IUserRepository";
import { SignUpDTO } from "../../types/UserProps";

class SignUpUseCase {
  constructor(private userRepository: IUserRepository) {}

  public async execute(data: SignUpDTO) {
    const { error, value } = validateSignUp(data);

    if (error) {
      throw createHttpError(401, "Fields are invalid");
    }

    const userAlreadyExist = this.userRepository.findOne({
      where: {
        email: value.email,
      },
    });

    if (!userAlreadyExist) {
      throw createHttpError(409, "User already exist");
    }

    const userCreated = await this.userRepository.create(value);
    const user = await this.userRepository.save(userCreated);

    const token = jwt.sign(
      { ud: user.id },
      JSON.stringify(process.env.JWT_SECRET),
      {
        expiresIn: "30d",
      }
    );

    return { user, token };
  }
}

export { SignUpUseCase };
