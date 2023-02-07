import { UserRepository } from "../../repositories/UserRepository";
import { SignInController } from "./signInController";
import { SignInUseCase } from "./signInUseCase";

const userRepository = new UserRepository();
const signInUseCase = new SignInUseCase(userRepository);
const signInController = new SignInController(signInUseCase);

export { signInController };
