import { UserRepository } from "../../repositories/UserRepository";
import { DeleteUserController } from "./deleteUserController";
import { DeleteUserUseCase } from "./deleteUserUseCase";

const userRepository = new UserRepository();
const deleteUserUseCase = new DeleteUserUseCase(userRepository);
const deleteUserController = new DeleteUserController(deleteUserUseCase);

export { deleteUserController };
