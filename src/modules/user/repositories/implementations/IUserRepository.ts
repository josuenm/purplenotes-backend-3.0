import { FilterQuery, QueryOptions } from "mongoose";
import { SignUpDTO } from "../../../../services/zod/user/sign-up-validation";
import { UserDocument } from "../../entities/User";

interface IUserRepository {
  findOne: (
    query: FilterQuery<UserDocument>,
    options?: QueryOptions
  ) => Promise<UserDocument | null>;
  save: (user: UserDocument) => Promise<UserDocument>;
  create: (data: SignUpDTO) => Promise<UserDocument>;
  delete: (user: UserDocument) => Promise<void>;
  update: (id: string, user: UserDocument) => Promise<UserDocument>;
}

export { IUserRepository };
