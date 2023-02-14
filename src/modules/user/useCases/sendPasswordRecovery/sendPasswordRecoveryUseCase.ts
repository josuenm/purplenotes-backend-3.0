import createHttpError from "http-errors";
import { SendMailProps } from "../../../../services/nodemailer";
import { passwordRecoveryTemplate } from "../../../../services/nodemailer/templates/password-recovery-template";
import validate from "../../../../services/zod/user/create-password-recovery-validation";
import { IPasswordRecoveryRepository } from "../../repositories/implementations/IPasswordRecoveryRepository";
import { IUserRepository } from "../../repositories/implementations/IUserRepository";

class SendPasswordRecoveryUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordRecoveryRepository: IPasswordRecoveryRepository,
    private mailSender: SendMailProps
  ) {}

  public async execute(email: string) {
    const validation = validate({ email });
    const values = validation.data;

    if (!validation.success) {
      throw createHttpError(401, "Field are invalid");
    }

    const user = await this.userRepository.findOne({ email: values.email });

    if (!user) {
      throw createHttpError(404, "User not found");
    }

    const passwordRecovery = this.passwordRecoveryRepository.create({
      email: values.email,
      author: user._id,
    });

    const { attachments, text, subject, html } = passwordRecoveryTemplate(
      process.env.FRONTEND_URL || "",
      passwordRecovery._id
    );

    await this.mailSender({
      from: `Purple Notes <${process.env.NODEMAILER_USER}>`,
      to: [values.email],
      subject,
      text,
      attachments: [...attachments],
      html,
    });

    return await this.passwordRecoveryRepository.save(passwordRecovery);
  }
}

export { SendPasswordRecoveryUseCase };
