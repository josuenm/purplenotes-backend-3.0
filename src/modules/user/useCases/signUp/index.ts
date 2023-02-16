import sendEmail from "../../../../services/nodemailer";
import { UserRepository } from "../../repositories/UserRepository";
import { SignUpController } from "./signUpController";
import { SignUpUseCase } from "./signUpUseCase";

const userRepository = new UserRepository();
const signUpUseCase = new SignUpUseCase(userRepository, sendEmail);
const signUpController = new SignUpController(signUpUseCase);

export { signUpController };
