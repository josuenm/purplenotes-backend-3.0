import { z } from "zod";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(80),
});

type SignInDTO = z.infer<typeof signInSchema>;
type ZodResponseProps = {
  success: boolean;
  data: SignInDTO;
};

export { SignInDTO };
export default (data: SignInDTO) =>
  signInSchema.safeParse(data) as ZodResponseProps;
