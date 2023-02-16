import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { v4 as uuid } from "uuid";

interface AccountConfirmationInput {
  token: string;
  expiryDate: Date;
  email: string;
  isConfirmed: boolean;
}

export interface UserInput {
  name: string;
  email: string;
  password: string;
  accountConfirmation: AccountConfirmationInput;
  createdAt: string;
  updatedAt: string;
}

export interface UserDocument extends UserInput, mongoose.Document {
  comparePassword: (password: string) => Promise<boolean>;
}

function generateExpiryDate() {
  const expirationDate = new Date();
  expirationDate.setMonth(expirationDate.getMonth() + 1);
  return expirationDate;
}

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, min: 1, max: 80 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, min: 6, max: 80 },
  accountConfirmation: {
    token: { type: String, required: true, default: uuid() },
    expiryDate: { type: Date, required: true, default: generateExpiryDate() },
    email: { type: String, required: true },
    isConfirmed: { type: Boolean, required: true, default: false },
  },
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now },
});

UserSchema.pre("save", async function (this: UserDocument, next) {
  // only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) return next();

  // hashed password
  const hashedPassword = await bcrypt.hash(this.password, 8);

  // replace password with hashed password
  this.password = hashedPassword;

  return next();
});

UserSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  const user = this as UserDocument;
  return bcrypt.compare(password, user.password).catch(() => false);
};

export default mongoose.model<UserDocument>("User", UserSchema);
