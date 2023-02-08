interface NewNoteDTO {
  title: string;
  body: string;
  privacy: boolean;
}

interface UpdateNoteDTO {
  title: string;
  body: string;
  privacy: boolean;
}

export { NewNoteDTO, UpdateNoteDTO };
