import { FindOneOptions } from "typeorm";
import { User } from "../../entities/User";
import { SignUpDTO } from "../../types/UserProps";

interface IUserRepository {
  findOne: (where: FindOneOptions<User>) => Promise<User | null>;
  save: (user: User) => Promise<User>;
  create: (data: SignUpDTO) => Promise<User>;
  delete: (email: string) => Promise<void>;
}

export { IUserRepository };
