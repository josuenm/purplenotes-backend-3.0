import Joi, { Schema } from "joi";
import {
  SignInDTO,
  SignUpDTO,
  UserUpdateDTO,
} from "../modules/user/types/UserProps";

const userSchema = {
  name: Joi.string().min(1).max(80).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(20).required(),
};

function validate(schema: Schema, data: any) {
  return schema.validate(data, {
    abortEarly: false,
  });
}

function firstLetterUppercase(text: string) {
  const arrText: string[] = text.split(" ");
  const formattedArrText: string[] = arrText.map(
    (item) => item.toLowerCase().charAt(0).toUpperCase() + item.slice(1)
  );
  return formattedArrText.toString().replace(",", " ");
}

function validateSignIn(data: SignInDTO) {
  return validate(
    Joi.object({
      email: userSchema.email,
      password: userSchema.password,
    }),
    data
  );
}

function validateSignUp(data: SignUpDTO) {
  const response = validate(Joi.object(userSchema), data);
  response.value.name = firstLetterUppercase(response.value.name);
  return response;
}

function validateUserUpdate(data: UserUpdateDTO) {
  return validate(Joi.object(userSchema), data);
}

export { validateSignUp, validateUserUpdate, validateSignIn };
