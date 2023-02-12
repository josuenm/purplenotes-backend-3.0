import Joi, { Schema } from "joi";
import { NewNoteDTO, UpdateNoteDTO } from "../modules/note/types/NoteProps";
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

const noteSchema = {
  title: Joi.string().required(),
  body: Joi.string().allow(null, "").required(),
  privacy: Joi.boolean().required(),
};

const createPasswordRecoverySchema = {
  email: Joi.string().email().required(),
};

const confirmPasswordRecoverySchema = {
  email: Joi.string().min(6).max(20).required(),
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

function validateNewNote(data: NewNoteDTO) {
  return validate(Joi.object(noteSchema), data);
}

function validateNoteUpdate(data: UpdateNoteDTO) {
  return validate(Joi.object(noteSchema), data);
}

function validateCreatePasswordRecovery(data: string) {
  return validate(Joi.object(createPasswordRecoverySchema), { email: data });
}

function validateConfirmPasswordRecovery(data: string) {
  return validate(Joi.object(confirmPasswordRecoverySchema), {
    password: data,
  });
}

export {
  validateSignUp,
  validateUserUpdate,
  validateSignIn,
  validateNewNote,
  validateNoteUpdate,
  validateCreatePasswordRecovery,
  validateConfirmPasswordRecovery,
};
