import { UserRepository } from "../../repositories/UserRepository";
import { UpdateBasicInfoController } from "./updateBasicInfoController";
import { UpdateBasicInfoUseCase } from "./updateBasicInfoUseCase";

const userRepository = new UserRepository();
const updateBasicInfoUseCase = new UpdateBasicInfoUseCase(userRepository);
const updateBasicInfoController = new UpdateBasicInfoController(
  updateBasicInfoUseCase
);

export { updateBasicInfoController };
