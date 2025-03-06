import { z } from 'zod';

const ZodProjectSchema = z.object({
  name: z.string().nonempty().min(3),
  website: z.string().url().optional(),
  description: z.string().nonempty(),
  recipient_legal_status: z.string(),
  logo: z.instanceof(File).optional(),
  leadership_demographics: z.array(z.string()).nonempty(),
  leadership_demographics_other: z.string().optional(),
  country_id: z.string(),
  state_id: z.string().optional(),
  city: z.string(),
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
