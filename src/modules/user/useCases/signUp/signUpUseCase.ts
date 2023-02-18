import "dotenv/config";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { SendMailProps } from "../../../../services/nodemailer";
import { accountConfirmationTemplate } from "../../../../services/nodemailer/templates/account-confirmation-template";
import validate, {
  capitalizeFirstLetter,
  SignUpDTO,
} from "../../../../services/zod/user/sign-up-validation";
import { IUserRepository } from "../../repositories/implementations/IUserRepository";

class SignUpUseCase {
  constructor(
    private userRepository: IUserRepository,
    private mailSender: SendMailProps
  ) {}

  public async execute(data: SignUpDTO) {
    const validation = validate(data);
    const values = validation.data;
    values.name = capitalizeFirstLetter(values.name);

    if (!validation.success) {
      throw createHttpError(401, "Fields are invalid");
    }

    const userAlreadyExist = await this.userRepository.findOne({
      email: values.email,
    });

    if (userAlreadyExist) {
      throw createHttpError(409, "User already exist");
    }

    const userCreated = await this.userRepository.create(values);
    const user = await this.userRepository.save(userCreated);

    const token = jwt.sign(
      { id: user._id },
      JSON.stringify(process.env.JWT_SECRET),
      {
        expiresIn: "30d",
      }
    );

    const { attachments, text, subject, html } = accountConfirmationTemplate(
      process.env.FRONTEND_URL || "",
      user.accountConfirmation.token
    );

    await this.mailSender({
      from: `Purple Notes <${process.env.NODEMAILER_USER}>`,
      to: [user.accountConfirmation.email],
      subject,
      text,
      attachments: [...attachments],
      html,
    });

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

export { SignUpUseCase };
