import { z } from 'zod';

const ZodProjectSchema = z.object({
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
  favoriteColor: z.string().optional(),
});

export type ProjectSchema = z.infer<typeof ZodProjectSchema>;

export const validator = (formValues: ProjectSchema) => {
  const validation = ZodProjectSchema.safeParse(formValues);
  if (validation.success) {
    return {};
  }
  return validation.error;
};
