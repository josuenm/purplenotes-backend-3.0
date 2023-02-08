import "dotenv/config";
import { DataSource } from "typeorm";
import { User } from "../../modules/user/entities/User";

export const AppDataSource = new DataSource({
  type: "mongodb",
  host: "localhost",
  synchronize: true,
  logging: true,
  authSource: "admin",
  username: process.env.MONGO_USER,
  password: process.env.MONGO_PASS,
  entities: [User],
  subscribers: [],
  migrations: [],
});
