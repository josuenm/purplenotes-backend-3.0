import { z } from "zod";

const basicInfoSchema = z.object({
  name: z.string().min(1).max(80),
  email: z.string().email(),
});

type BasicInfoDTO = z.infer<typeof basicInfoSchema>;
type ZodResponseProps = {
  success: boolean;
  data: BasicInfoDTO;
};

export { BasicInfoDTO };
export default (data: BasicInfoDTO) =>
  basicInfoSchema.safeParse(data) as ZodResponseProps;
