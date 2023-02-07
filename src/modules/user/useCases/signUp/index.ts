import { UserRepository } from "../../repositories/UserRepository";
import { SignUpController } from "./signUpController";
import { SignUpUseCase } from "./signUpUseCase";

const userRepository = new UserRepository();
const signUpUseCase = new SignUpUseCase(userRepository);
const signUpController = new SignUpController(signUpUseCase);

export { signUpController };
