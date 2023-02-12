import mongoose from "mongoose";

export interface NoteInput {
  title: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  privacy: boolean;
  author: string;
}

export interface NoteDocument extends NoteInput, mongoose.Document {}

const NoteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now },
  privacy: { type: Boolean, required: true },
  author: { type: String, required: true },
});

export default mongoose.model<NoteDocument>("Note", NoteSchema);
