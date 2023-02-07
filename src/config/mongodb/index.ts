import { AppDataSource } from "./data-source";

AppDataSource.initialize()
  .then(async () => console.log("🍃 mongodb is running"))
  .catch((error) => console.log(error));
