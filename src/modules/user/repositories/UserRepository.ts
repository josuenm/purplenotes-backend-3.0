import bcrypt from "bcrypt";
import createHttpError from "http-errors";
import { FindOneOptions, Repository } from "typeorm";
import { AppDataSource } from "../../../config/mongodb/data-source";
import { User } from "../models/User";
import { SignUpDTO } from "../types/UserProps";
import { IUserRepository } from "./implementations/IUserRepository";

class UserRepository implements IUserRepository {
  private static repo: Repository<User>;

  constructor() {
    if (!UserRepository.repo) {
      UserRepository.repo = AppDataSource.getRepository(User);
    }
  }

  public async findOne(where: FindOneOptions<User>) {
    return UserRepository.repo.findOne(where);
  }

  public async save(user: User) {
    try {
      return await UserRepository.repo.save(user);
    } catch (e) {
      throw createHttpError(500, "Error saving user");
    }
  }

  public async create(data: SignUpDTO) {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 8);
      return UserRepository.repo.create({
        ...data,
        password: hashedPassword,
      });
    } catch (e) {
      throw createHttpError(500, "Error finding user");
    }
  }

  public async update(user: User) {
    try {
      return await UserRepository.repo.save(user);
    } catch (e) {
      throw createHttpError(500, "Error updating user");
    }
  }

  public async delete(email: string) {
    try {
      await UserRepository.repo.delete({ email });
    } catch (e) {
      throw createHttpError(500, "Error deleting user");
    }
  }
}

export { UserRepository };
