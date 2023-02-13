import { Router } from "express";
import { auth } from "../middlewares/auth";
import { confirmPasswordRecoveryController } from "../modules/user/useCases/confirmPasswordRecovery";
import { createPasswordRecoveryController } from "../modules/user/useCases/createPasswordRecovery";
import { deleteUserController } from "../modules/user/useCases/deleteUser";
import { signInController } from "../modules/user/useCases/signIn";
import { signUpController } from "../modules/user/useCases/signUp";
import { updateBasicInfoController } from "../modules/user/useCases/updateBasicInfo";

const route = Router();

route.post("/sign-in", (req, res, next) => {
  signInController.handle(req, res, next);
});

route.post("/sign-up", (req, res, next) => {
  signUpController.handle(req, res, next);
});

route.delete("/", auth, (req, res, next) => {
  deleteUserController.handle(req, res, next);
});

route.put("/basic-info", auth, (req, res, next) => {
  updateBasicInfoController.handle(req, res, next);
});

route.post("/password-recovery", (req, res, next) => {
  createPasswordRecoveryController.handle(req, res, next);
});

route.get("/password-recovery/confirm", (req, res, next) => {
  confirmPasswordRecoveryController.handle(req, res, next);
});

export { route as userRoute };

