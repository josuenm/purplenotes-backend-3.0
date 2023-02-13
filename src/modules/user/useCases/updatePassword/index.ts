import { UserRepository } from "../../repositories/UserRepository";
import { UpdatePasswordController } from "./updatePasswordController";
import { UpdatePasswordUseCase } from "./updatePasswordUseCase";

const userRepository = new UserRepository();

const useCase = new UpdatePasswordUseCase(userRepository);

const controller = new UpdatePasswordController(useCase);

export { controller as updatePasswordController };
