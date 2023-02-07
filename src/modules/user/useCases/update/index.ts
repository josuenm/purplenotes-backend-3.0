import { UserRepository } from "../../repositories/UserRepository";
import { UpdateController } from "./updateController";
import { UpdateUseCase } from "./updateUseCase";

const userRepository = new UserRepository();
const updateUseCase = new UpdateUseCase(userRepository);
const updateController = new UpdateController(updateUseCase);

export { updateController };
