import { FindOneOptions } from "typeorm";
import { User } from "../../models/User";
import { SignUpDTO } from "../../types/UserProps";

interface IUserRepository {
  findOne: (where: FindOneOptions<User>) => Promise<User | null>;
  save: (user: User) => Promise<User>;
  create: (data: SignUpDTO) => Promise<User>;
  update: (user: User) => Promise<User>;
  delete: (name: string) => Promise<void>;
}

export { IUserRepository };