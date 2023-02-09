import { PasswordRecoveryRepository } from "../../repositories/PasswordRecoveryRepository";
import { UserRepository } from "../../repositories/UserRepository";
import { CreatePasswordRecoveryController } from "./createPasswordRecoveryController";
import { CreatePasswordRecoveryUseCase } from "./createPasswordRecoveryUseCase";

const passwordRecoveryRepository = new PasswordRecoveryRepository();

const userRepository = new UserRepository();

const useCase = new CreatePasswordRecoveryUseCase(
  userRepository,
  passwordRecoveryRepository
);

const controller = new CreatePasswordRecoveryController(useCase);

export { controller as createPasswordRecoveryController };
