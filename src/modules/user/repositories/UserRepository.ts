import createHttpError from "http-errors";
import { FilterQuery, QueryOptions } from "mongoose";
import { SignUpDTO } from "../../../services/zod/user/sign-up-validation";
import User, { UserDocument } from "../entities/User";
import { IUserRepository } from "./implementations/IUserRepository";

class UserRepository implements IUserRepository {
  public async findOne(
    query: FilterQuery<UserDocument>,
    options?: QueryOptions
  ) {
    return User.findOne(query, null, options);
  }

  public async save(user: UserDocument) {
    try {
      return await user.save();
    } catch (e) {
      throw createHttpError(500, "Error saving user");
    }
  }

  public async update(id: string, user: UserDocument) {
    try {
      return await User.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            name: user.name,
            email: user.email,
            updatedAt: Date.now(),
          },
        },
        { upsert: true, returnOriginal: false }
      );
    } catch (e) {
      throw createHttpError(500, "Error updating user");
    }
  }

  public async create(data: SignUpDTO) {
    try {
      return new User({
        ...data,
        accountConfirmation: {
          email: data.email,
        },
      });
    } catch (e) {
      throw createHttpError(500, "Error finding user");
    }
  }

  public async delete(user: UserDocument) {
    try {
      await user.delete();
    } catch (e) {
      throw createHttpError(500, "Error deleting user");
    }
  }
}

export { UserRepository };
