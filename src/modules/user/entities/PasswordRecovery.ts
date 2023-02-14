import mongoose from "mongoose";

export interface PasswordRecoveryInput {
  author: string;
  email: string;
  isUsed: boolean;
  expiryDate: Date;
  createdAt: Date;
}

export interface PasswordRecoveryDocument
  extends PasswordRecoveryInput,
    mongoose.Document {}

function generateExpiryDate() {
  const currentDate = new Date();
  const expirationDate = new Date(currentDate);
  expirationDate.setDate(expirationDate.getDate() + 1);
  return expirationDate;
}

const PasswordRecoverySchema = new mongoose.Schema({
  author: { type: String, required: true },
  email: { type: String, required: true },
  isUsed: { type: Boolean, required: true, default: false },
  expiryDate: { type: Date, required: true, default: generateExpiryDate() },
  createdAt: { type: Date, required: true, default: Date.now },
});

export default mongoose.model<PasswordRecoveryDocument>(
  "PasswordRecovery",
  PasswordRecoverySchema
);
