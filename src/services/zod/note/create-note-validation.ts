import { z } from "zod";

const CreateNoteValidation = z.object({
  title: z.string(),
  body: z.string(),
  privacy: z.boolean(),
});

type CreateNoteDTO = z.infer<typeof CreateNoteValidation>;

type ZodResponseProps = {
  success: boolean;
  data: CreateNoteDTO;
};

export { CreateNoteDTO };
export default (data: CreateNoteDTO) =>
  CreateNoteValidation.safeParse(data) as ZodResponseProps;
