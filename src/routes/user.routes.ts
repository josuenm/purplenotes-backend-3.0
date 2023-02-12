import { Router } from "express";
import { auth } from "../middlewares/auth";
import { confirmPasswordRecoveryController } from "../modules/user/useCases/confirmPasswordRecovery";
import { createPasswordRecoveryController } from "../modules/user/useCases/createPasswordRecovery";
import { deleteController } from "../modules/user/useCases/delete";
import { signInController } from "../modules/user/useCases/signIn";
import { signUpController } from "../modules/user/useCases/signUp";
import { updateController } from "../modules/user/useCases/update";

const route = Router();

route.post("/sign-in", (req, res, next) => {
  signInController.handle(req, res, next);
});

route.post("/sign-up", (req, res, next) => {
  signUpController.handle(req, res, next);
});

route.delete("/", auth, (req, res, next) => {
  deleteController.handle(req, res, next);
});

route.put("/", auth, (req, res, next) => {
  updateController.handle(req, res, next);
});

route.post("/password-recovery", (req, res, next) => {
  createPasswordRecoveryController.handle(req, res, next);
});

route.get("/password-recovery/confirm", (req, res, next) => {
  confirmPasswordRecoveryController.handle(req, res, next);
});

export { route as userRoute };
