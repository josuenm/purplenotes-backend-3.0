import sendEmail from "../../../../services/nodemailer";
import { UserRepository } from "../../repositories/UserRepository";
import { SendAccountConfirmationController } from "./sendAccountConfirmationController";
import { SendAccountConfirmationUseCase } from "./sendAccountConfirmationUseCase";

const repository = new UserRepository();

const useCase = new SendAccountConfirmationUseCase(repository, sendEmail);

const controller = new SendAccountConfirmationController(useCase);

export { controller as sendAccountConfirmationController };
