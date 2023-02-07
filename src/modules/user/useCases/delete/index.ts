import { UserRepository } from "../../repositories/UserRepository";
import { DeleteController } from "./deleteController";
import { DeleteUseCase } from "./deleteUseCase";

const userRepository = new UserRepository();
const deleteUseCase = new DeleteUseCase(userRepository);
const deleteController = new DeleteController(deleteUseCase);

export { deleteController };
