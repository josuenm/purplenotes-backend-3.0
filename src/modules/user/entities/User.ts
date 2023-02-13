import bcrypt from "bcrypt";
import mongoose from "mongoose";

interface AccountConfirmationInput {
  email: string;
  isUsed: boolean;
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

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  accountConfirmation: {
    email: { type: String, required: true },
    isUsed: { type: Boolean, required: true, default: false },
  },
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now },
});

UserSchema.pre("save", async function (this: UserDocument, next) {
  // only hash the password if it has been modified (or is ne)
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
