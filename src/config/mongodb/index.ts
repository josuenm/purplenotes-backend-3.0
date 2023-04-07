import "dotenv/config";
import mongoose from "mongoose";

const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASS = process.env.MONGO_PASS;
const MONGO_DB = process.env.MONGO_DB;
const MONGO_HOST = process.env.MONGO_HOST;
const MONGO_PARAMS = process.env.MONGO_PARAMS;
let URL = "";

if (process.env.NODE_ENV !== "production") {
  const MONGO_PORT = process.env.MONGO_PORT;
  URL = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:${MONGO_PORT}`;
} else {
  URL = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}/${MONGO_DB}${MONGO_PARAMS}`;
}

mongoose.Promise = global.Promise;
const MONGO_URL = URL;

mongoose.set("strictQuery", true);

mongoose
  .connect(MONGO_URL, {
    authSource: "admin",
    user: MONGO_USER,
    pass: MONGO_PASS,
  })
  .then(() => console.log("🍃 MongoDB is running"))
  .catch((e) => console.log(e));
