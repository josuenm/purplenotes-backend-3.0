import createHttpError from "http-errors";
import { v4 as uuid } from "uuid";
import { SendMailProps } from "../../../../services/nodemailer";
import { accountConfirmationTemplate } from "../../../../services/nodemailer/templates/account-confirmation-template";
import validate, {
  BasicInfoDTO,
} from "../../../../services/zod/user/update-basic-info-validation";
import { UserDocument } from "../../entities/User";
import { IUserRepository } from "../../repositories/implementations/IUserRepository";

class UpdateBasicInfoUseCase {
  constructor(
    private userRepository: IUserRepository,
    private mailSender: SendMailProps
  ) {}

  public async execute(user: UserDocument, data: BasicInfoDTO) {
    const validation = validate(data);
    const values = validation.data;

    if (!validation.success) {
      throw createHttpError(401, "Fields are invalid");
    }

    user.name = values.name;

    if (user.email !== values.email) {
      function generateExpiryDate() {
        const expirationDate = new Date();
        expirationDate.setMonth(expirationDate.getMonth() + 1);
        return expirationDate;
      }

      user.accountConfirmation = {
        token: uuid(),
        email: values.email,
        isConfirmed: false,
        expiryDate: generateExpiryDate(),
      };

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
    }

    const userUpdated = await this.userRepository.update(user);

    return {
      name: userUpdated.name,
      email: userUpdated.email,
      accountConfirmation: userUpdated.accountConfirmation,
    };
  }
}

export { UpdateBasicInfoUseCase };
