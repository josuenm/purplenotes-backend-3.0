import { Router } from "express";
import { auth } from "../middlewares/auth";
import { confirmPasswordRecoveryController } from "../modules/user/useCases/confirmPasswordRecovery";
import { createPasswordRecoveryController } from "../modules/user/useCases/createPasswordRecovery";
import { deleteController } from "../modules/user/useCases/delete";
import { signInController } from "../modules/user/useCases/signIn";
import { signUpController } from "../modules/user/useCases/signUp";
import { updateController } from "../modules/user/useCases/update";

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

route.put("/", auth, (req, res, next) => {
  updateController.handle(req, res, next);
});

route.post("/passwordRecovery", (req, res, next) => {
  createPasswordRecoveryController.handle(req, res, next);
});

route.get("/passwordRecovery/confirm", (req, res, next) => {
  confirmPasswordRecoveryController.handle(req, res, next);
});

export { route as userRoute };
