import { FindOneOptions, Repository } from "typeorm";
import { AppDataSource } from "../../../config/mongodb/data-source";
import { PasswordRecovery } from "../entities/PasswordRecovery";
import { CreatePasswordRecoveryDTO } from "../types/PasswordRecoveryProps";
import { IPasswordRecoveryRepository } from "./implementations/IPasswordRecoveryRepository";

class PasswordRecoveryRepository implements IPasswordRecoveryRepository {
  private static repo: Repository<PasswordRecovery>;

  constructor() {
    if (!PasswordRecoveryRepository.repo) {
      PasswordRecoveryRepository.repo =
        AppDataSource.getRepository(PasswordRecovery);
    }
  }

  public findOne(where: FindOneOptions<PasswordRecovery>) {
    return PasswordRecoveryRepository.repo.findOne(where);
  }

  public create(data: CreatePasswordRecoveryDTO) {
    return PasswordRecoveryRepository.repo.create(data);
  }

  public async save(passwordRecovery: PasswordRecovery) {
    return await PasswordRecoveryRepository.repo.save(passwordRecovery);
  }

  public async confirm(data: PasswordRecovery) {
    await this.save({ ...data, isUsed: true });
  }

  public async send() {}
}

export { PasswordRecoveryRepository };
