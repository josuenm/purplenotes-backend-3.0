import createHttpError from "http-errors";
import { FilterQuery, QueryOptions } from "mongoose";
import User, { UserDocument } from "../entities/User";
import { SignUpDTO } from "../types/UserProps";
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

  public async update(user: UserDocument) {
    try {
      return await User.findOneAndUpdate(
        { _id: user._id },
        {
          $set: {
            name: user.name,
            email: user.email,
            password: user.password,
            accountConfirmation: user.accountConfirmation,
            updatedAt: Date.now,
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
