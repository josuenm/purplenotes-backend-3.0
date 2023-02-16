import { v4 as uuid } from "uuid";
import { SendMailProps } from "../../../../services/nodemailer";
import { accountConfirmationTemplate } from "../../../../services/nodemailer/templates/account-confirmation-template";
import { UserDocument } from "../../entities/User";
import { IUserRepository } from "../../repositories/implementations/IUserRepository";

class SendAccountConfirmationUseCase {
  constructor(
    private userRepository: IUserRepository,
    private mailSender: SendMailProps
  ) {}

  public async execute(user: UserDocument) {
    user.accountConfirmation.token = uuid();
    const userUpdated = await this.userRepository.update(user);

    const { attachments, text, subject, html } = accountConfirmationTemplate(
      process.env.FRONTEND_URL || "",
      userUpdated.accountConfirmation.token
    );

    await this.mailSender({
      from: `Purple Notes <${process.env.NODEMAILER_USER}>`,
      to: [userUpdated.accountConfirmation.email],
      subject,
      text,
      attachments: [...attachments],
      html,
    });
  }
}

export { SendAccountConfirmationUseCase };
