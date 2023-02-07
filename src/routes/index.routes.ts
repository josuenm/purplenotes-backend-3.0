import express from "express";
import { noteRoute } from "./note.routes";
import { userRoute } from "./user.routes";

const route = express();

route.use("/user", userRoute);
route.use("/note", noteRoute);

export { route as routes };
