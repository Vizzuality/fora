import { z } from 'zod';

const ProjectZodSchema = z.object({
  name: z
    .string({
      message: `Name cannot be empty`,
    })
    .min(3, {
      message: `Name must contain at least 3 characters`,
    }),
  website: z
    .string()
    .url({
      message: `Website must be a valid URL starting with http(s)://`,
    })
    .optional(),
  description: z.string({
    message: `Description cannot be empty`,
  }),
  recipient_legal_status: z.string({
    message: `A legal status must be selected`,
  }),
  logo: z.instanceof(File).optional(),
  country_id: z.string({
    message: 'A country must be selected',
  }),
  state_id: z.string().optional(),
  city: z.string({
    message: 'City cannot be empty',
  }),
});

const LeadershipDemographicsSchema = z
  .object({
    leadership_demographics: z.array(z.string()).min(1, {
      message: 'Please select at least one demography',
    }),
    leadership_demographics_other: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.leadership_demographics.includes('other') && !data.leadership_demographics_other) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please provide a value for other',
        path: ['leadership_demographics_other'],
      });
    }
  });

const InternalYes = ProjectZodSchema.extend({
  internal_leadership_demographics_collection: z.literal('yes'),
  ...LeadershipDemographicsSchema.innerType().shape,
});

const InternalNo = ProjectZodSchema.extend({
  internal_leadership_demographics_collection: z.literal('no'),
  leadership_demographics: z.array(z.string()).optional(),
  leadership_demographics_other: z.string().optional(),
});

export const ProjectSchemaUnion = z.discriminatedUnion(
  'internal_leadership_demographics_collection',
  [InternalYes, InternalNo],
);

export type ProjectSchema = z.infer<typeof ProjectSchemaUnion>;

export const validator = (formValues: ProjectSchema) => {
  const validationMap: {
    projects: ReturnType<typeof ProjectSchemaUnion.safeParse>;
    demographics: ReturnType<typeof LeadershipDemographicsSchema.safeParse>;
  } = {
    projects: null,
    demographics: null,
  };

  validationMap.projects = ProjectSchemaUnion.safeParse(formValues);

  Object.keys(validationMap).forEach((key) => {
    if (validationMap[key] === null) {
      delete validationMap[key];
    }
  });

  if (formValues.internal_leadership_demographics_collection === 'yes') {
    validationMap.demographics = LeadershipDemographicsSchema.safeParse(formValues);
  }

  if (Object.values(validationMap).every((v) => v.success)) {
    return {};
  }

  return Object.values(validationMap).reduce((acc, validation) => {
    if (!validation.error) {
      return acc;
    }

    return {
      ...acc,
      ...validation.error.format(),
    };
  }, {});
};
