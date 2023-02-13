import { z } from "zod";

const UpdateNoteSchema = z.object({
  title: z.string(),
  body: z.string(),
  privacy: z.boolean(),
});

type UpdateNoteDTO = z.infer<typeof UpdateNoteSchema>;
type ZodResponseProps = {
  success: boolean;
  data: UpdateNoteDTO;
};

export { UpdateNoteDTO };
export default (data: UpdateNoteDTO) =>
  UpdateNoteSchema.safeParse(data) as ZodResponseProps;
