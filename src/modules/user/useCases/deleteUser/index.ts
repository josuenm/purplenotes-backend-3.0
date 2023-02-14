import { NoteRepository } from "../../../note/repositories/NoteRepository";
import { UserRepository } from "../../repositories/UserRepository";
import { DeleteUserController } from "./deleteUserController";
import { DeleteUserUseCase } from "./deleteUserUseCase";

const userRepository = new UserRepository();
const noteRepository = new NoteRepository();
const deleteUserUseCase = new DeleteUserUseCase(userRepository, noteRepository);
const deleteUserController = new DeleteUserController(deleteUserUseCase);

export { deleteUserController };
