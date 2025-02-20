import { z } from 'zod';

const ZodProjectSchema = z.object({
  name: z.string().nonempty().min(3),
  website: z.string().url().optional(),
  description: z.string().nonempty(),
  logo: z.instanceof(File).optional(),
  demographics: z.array(z.string()).nonempty(),
  demographics_other: z.string().optional(),
});

export type ProjectSchema = z.infer<typeof ZodProjectSchema>;

export const validator = (formValues: ProjectSchema) => {
  const validation = ZodProjectSchema.safeParse(formValues);
  console.log({ formValues, validation }); // @todo for debugging purposes. Remove later
  if (validation.success) {
    return {};
  }
  return validation.error;
};
