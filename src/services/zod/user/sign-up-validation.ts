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

const capitalizeFirstLetter = (name: string) => {
  const nameLowerCase = name.toLowerCase();
  return `${nameLowerCase.slice(0, 1).toUpperCase()}${nameLowerCase.slice(
    1,
    nameLowerCase.length
  )}`;
};

export { SignUpDTO, capitalizeFirstLetter };
export default (data: SignUpDTO) =>
  signUpSchema.safeParse(data) as ZodResponseProps;
