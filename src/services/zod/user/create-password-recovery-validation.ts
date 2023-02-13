import { z } from "zod";

const createPasswordRecoverySchema = z.object({
  email: z.string().email(),
});

type CreatePasswordRecoveryDTO = z.infer<typeof createPasswordRecoverySchema>;
type ZodResponseProps = {
  success: boolean;
  data: CreatePasswordRecoveryDTO;
};

export { CreatePasswordRecoveryDTO };
export default (data: CreatePasswordRecoveryDTO) =>
  createPasswordRecoverySchema.safeParse(data) as ZodResponseProps;
