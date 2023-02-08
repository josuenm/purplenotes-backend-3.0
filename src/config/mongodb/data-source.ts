import "dotenv/config";
import { DataSource } from "typeorm";
import { Note } from "../../modules/note/entities/Note";
import { User } from "../../modules/user/entities/User";

export const AppDataSource = new DataSource({
  type: "mongodb",
  host: "localhost",
  synchronize: false,
  logging: true,
  authSource: "admin",
  username: process.env.MONGO_USER,
  password: process.env.MONGO_PASS,
  entities: [User, Note],
  subscribers: [],
  migrations: [],
});
