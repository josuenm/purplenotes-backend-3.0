import { z } from "zod";

const signUpSchema = z.object({
  name: z.string().min(1).max(80),
  email: z.string().email(),
  password: z.string().min(6).max(80),
});

type SignUpDTO = z.infer<typeof signUpSchema>;
type ZodResponseProps = {
  success: boolean;
  data: SignUpDTO;
};

export { SignUpDTO };
export default (data: SignUpDTO) =>
  signUpSchema.safeParse(data) as ZodResponseProps;
