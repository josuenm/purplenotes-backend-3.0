import { UserRepository } from "../../repositories/UserRepository";
import { ConfirmAccountController } from "./confirmAccountController";
import { ConfirmAccountUseCase } from "./confirmAccountUseCase";

const repository = new UserRepository();

const useCase = new ConfirmAccountUseCase(repository);

const controller = new ConfirmAccountController(useCase);

export { controller as confirmAccountController };
