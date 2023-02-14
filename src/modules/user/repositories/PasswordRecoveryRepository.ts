import { FilterQuery, QueryOptions } from "mongoose";
import PasswordRecovery, {
  PasswordRecoveryDocument,
} from "../entities/PasswordRecovery";
import { IPasswordRecoveryRepository } from "./implementations/IPasswordRecoveryRepository";

class PasswordRecoveryRepository implements IPasswordRecoveryRepository {
  public async findOne(
    query: FilterQuery<PasswordRecoveryDocument>,
    options?: QueryOptions
  ) {
    return await PasswordRecovery.findOne(query, null, options);
  }

  public create(data: { email: string; author: string }) {
    return new PasswordRecovery(data);
  }

  public async save(passwordRecovery: PasswordRecoveryDocument) {
    return await passwordRecovery.save();
  }

  public async confirm(passwordRecovery: PasswordRecoveryDocument) {
    await PasswordRecovery.findOneAndUpdate(
      { _id: passwordRecovery._id },
      { $set: { isUsed: true } },
      { upsert: true, returnOriginal: false }
    );
  }

  public async send() {}
}

export { PasswordRecoveryRepository };
