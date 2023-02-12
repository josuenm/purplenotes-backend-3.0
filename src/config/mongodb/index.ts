import "dotenv/config";
import mongoose from "mongoose";

const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASS = process.env.MONGO_PASS;
const MONGO_PORT = process.env.MONGO_PORT;
const MONGO_HOST = process.env.MONGO_HOST;
const MONGO_DB = process.env.MONGO_DB;

mongoose.Promise = global.Promise;
const MONGO_URL = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;

mongoose.set("strictQuery", true);

mongoose
  .connect(MONGO_URL, {
    authSource: "admin",
    user: MONGO_USER,
    pass: MONGO_PASS,
  })
  .then(() => console.log("🍃 MongoDB is running"))
  .catch((e) => console.log(e));
