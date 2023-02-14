import { PasswordRecoveryRepository } from "../../repositories/PasswordRecoveryRepository";
import { GetPasswordRecoveryController } from "./getPasswordRecoveryController";
import { GetPasswordRecoveryUseCase } from "./getPasswordRecoveryUseCase";

const repository = new PasswordRecoveryRepository();

const useCase = new GetPasswordRecoveryUseCase(repository);

const controller = new GetPasswordRecoveryController(useCase);

export { controller as getPasswordRecoveryController };
