import { z } from "zod";

const passwordSchema = z.object({
  password: z.string().min(6).max(20),
});

type PasswordDTO = z.infer<typeof passwordSchema>;
type ZodResponseProps = {
  success: boolean;
  data: PasswordDTO;
};

export { PasswordDTO };
export default (data: PasswordDTO) =>
  passwordSchema.safeParse(data) as ZodResponseProps;
