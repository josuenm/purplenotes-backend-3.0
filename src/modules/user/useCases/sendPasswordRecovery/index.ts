import Nodemailer from "../../../../services/nodemailer";
import { PasswordRecoveryRepository } from "../../repositories/PasswordRecoveryRepository";
import { UserRepository } from "../../repositories/UserRepository";
import { SendPasswordRecoveryController } from "./sendPasswordRecoveryController";
import { SendPasswordRecoveryUseCase } from "./sendPasswordRecoveryUseCase";

const passwordRecoveryRepository = new PasswordRecoveryRepository();

const userRepository = new UserRepository();

const useCase = new SendPasswordRecoveryUseCase(
  userRepository,
  passwordRecoveryRepository,
  Nodemailer
);

const controller = new SendPasswordRecoveryController(useCase);

export { controller as sendPasswordRecoveryController };
