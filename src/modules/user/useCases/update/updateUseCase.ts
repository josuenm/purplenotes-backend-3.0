import { IUserRepository } from "../../repositories/implementations/IUserRepository";

class UpdateUseCase {
  constructor(private userRepository: IUserRepository) {}

  public async execute() {}
}

export { UpdateUseCase };
