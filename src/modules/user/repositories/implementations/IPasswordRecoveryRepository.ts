import { FilterQuery, QueryOptions } from "mongoose";
import { CreatePasswordRecoveryDTO } from "../../../../services/zod/user/create-password-recovery-validation";
import { PasswordRecoveryDocument } from "../../entities/PasswordRecovery";

interface IPasswordRecoveryRepository {
  create: (data: CreatePasswordRecoveryDTO) => PasswordRecoveryDocument;
  save: (data: PasswordRecoveryDocument) => Promise<PasswordRecoveryDocument>;
  send: (data: PasswordRecoveryDocument) => Promise<void>;
  confirm: (data: PasswordRecoveryDocument) => Promise<void>;
  findOne: (
    query: FilterQuery<PasswordRecoveryDocument>,
    options?: QueryOptions
  ) => Promise<PasswordRecoveryDocument | null>;
}

export { IPasswordRecoveryRepository };
