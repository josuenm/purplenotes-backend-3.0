import { Router } from "express";
import { auth } from "../middlewares/auth";
import { createNoteController } from "../modules/note/useCases/create";
import { deleteNoteController } from "../modules/note/useCases/delete";
import { getAllMyNotesController } from "../modules/note/useCases/getAllMyNotes";
import { getMyNoteController } from "../modules/note/useCases/getMyNote";
import { getNoteController } from "../modules/note/useCases/getNote";
import { updateNoteController } from "../modules/note/useCases/update";

const route = Router();

route.get("/my/all", auth, (req, res, next) => {
  getAllMyNotesController.handle(req, res, next);
});

route.get("/:token", (req, res, next) => {
  getNoteController.handle(req, res, next);
});

route.get("/my/:token", auth, (req, res, next) => {
  getMyNoteController.handle(req, res, next);
});

route.post("/", auth, (req, res, next) => {
  createNoteController.handle(req, res, next);
});

route.put("/:token", auth, (req, res, next) => {
  updateNoteController.handle(req, res, next);
});

route.delete("/:token", auth, (req, res, next) => {
  deleteNoteController.handle(req, res, next);
});

export { route as noteRoute };
