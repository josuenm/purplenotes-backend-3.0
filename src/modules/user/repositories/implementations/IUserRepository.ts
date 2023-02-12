import { FilterQuery, QueryOptions } from "mongoose";
import { UserDocument } from "../../entities/User";
import { SignUpDTO } from "../../types/UserProps";

interface IUserRepository {
  findOne: (
    query: FilterQuery<UserDocument>,
    options?: QueryOptions
  ) => Promise<UserDocument | null>;
  save: (user: UserDocument) => Promise<UserDocument>;
  create: (data: SignUpDTO) => Promise<UserDocument>;
  delete: (user: UserDocument) => Promise<void>;
  update: (user: UserDocument) => Promise<UserDocument>;
}

export { IUserRepository };
