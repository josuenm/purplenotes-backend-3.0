import { FindOneOptions } from "typeorm";
import { PasswordRecovery } from "../../entities/PasswordRecovery";
import { CreatePasswordRecoveryDTO } from "../../types/PasswordRecoveryProps";

interface IPasswordRecoveryRepository {
  create: (data: CreatePasswordRecoveryDTO) => PasswordRecovery;
  save: (data: PasswordRecovery) => Promise<PasswordRecovery>;
  send: (data: PasswordRecovery) => Promise<void>;
  confirm: (data: PasswordRecovery) => Promise<void>;
  findOne: (
    where: FindOneOptions<PasswordRecovery>
  ) => Promise<PasswordRecovery | null>;
}

export { IPasswordRecoveryRepository };
