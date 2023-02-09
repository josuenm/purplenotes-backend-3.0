import { PasswordRecoveryRepository } from "../../repositories/PasswordRecoveryRepository";
import { UserRepository } from "../../repositories/UserRepository";
import { confirmPasswordRecoveryController } from "./confirmPasswordRecoveryController";
import { ConfirmPasswordRecoveryUseCase } from "./confirmPasswordRecoveryUseCase";

const userRepository = new UserRepository();

const passwordRecoveryRepository = new PasswordRecoveryRepository();

const useCase = new ConfirmPasswordRecoveryUseCase(
  userRepository,
  passwordRecoveryRepository
);

const controller = new confirmPasswordRecoveryController(useCase);

export { controller as confirmPasswordRecoveryController };
