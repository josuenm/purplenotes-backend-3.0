import { Router } from "express";
import { auth } from "../middlewares/auth";
import { deleteController } from "../modules/user/useCases/delete";
import { signInController } from "../modules/user/useCases/signIn";
import { signUpController } from "../modules/user/useCases/signUp";

const route = Router();

route.post("/signIn", (req, res, next) => {
  signInController.handle(req, res, next);
});

route.post("/signUp", (req, res, next) => {
  signUpController.handle(req, res, next);
});

route.delete("/", auth, (req, res, next) => {
  deleteController.handle(req, res, next);
});

export { route as userRoute };
