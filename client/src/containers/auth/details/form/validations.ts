import { z } from 'zod';

import { OrganizationType } from '@/containers/auth/details/form/types';

const LegalStatusSchema = z
  .object({
    funder_legal_status: z.string({
      message: 'Please select a legal status',
    }),
    funder_legal_status_other: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.funder_legal_status === 'other' && !data.funder_legal_status_other) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please provide a value for other',
        path: ['funder_legal_status_other'],
      });
    }
  });

const OrganizationTypeSchema = z
  .object({
    // @todo confirm with API. This property is not implemented yet
    organization_type: z.nativeEnum(OrganizationType),
    // @todo confirm with API. This property is not implemented yet
    organization_type_other: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.organization_type === 'other' && !data.organization_type_other) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please provide a value for other',
        path: ['organization_type_other'],
      });
    }
  });

const showPrimaryEmailTypeSchema = z
  .object({
    show_primary_email: z.union([z.literal('yes'), z.literal('no')]).default('yes'),
    secondary_email_which_can_be_shared: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.show_primary_email === 'no' && !data.secondary_email_which_can_be_shared) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'A secondary email must be provided',
        path: ['secondary_email_which_can_be_shared'],
      });
    }
  });

const FunderZodSchema = z
  .object({
    name: z
      .string({
        message: `Name cannot be empty`,
      })
      .min(3, {
        message: `Name must contain at least 3 characters`,
      }),
    date_joined_fora: z.string().datetime({
      message: 'Date joined cannot be empty',
    }),
    primary_office_country_id: z.string({
      message: 'A country must be selected',
    }),
    primary_office_state_id: z.string().optional(),
    primary_office_city: z.string({
      message: 'City cannot be empty',
    }),
    primary_office_address: z.string().optional(),
    website: z
      .string()
      .url({
        message: `Website must be a valid URL starting with http(s)://`,
      })
      .optional(),

    description: z.string({
      message: `Description cannot be empty`,
    }),
    logo: z.instanceof(File).optional(),
    primary_contact_first_name: z.string({
      message: 'First name cannot be empty',
    }),
    primary_contact_last_name: z.string().optional(),
    primary_contact_email: z.string().email({
      message: 'Email must be a valid email address',
    }),
    primary_contact_phone: z.string().optional(),
    primary_contact_role: z.string().optional(),
    primary_contact_location: z.string().optional(),
  })
  .extend({
    ...LegalStatusSchema.innerType().shape,
    ...OrganizationTypeSchema.innerType().shape,
    ...showPrimaryEmailTypeSchema.innerType().shape,
  });

// const LeadershipDemographicsSchema = z
//   .object({
//     leadership_demographics: z.array(z.string()).min(1, {
//       message: 'Please select at least one demography',
//     }),
//     leadership_demographics_other: z.string().optional(),
//   })
//   .superRefine((data, ctx) => {
//     if (data.leadership_demographics.includes('other') && !data.leadership_demographics_other) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         message: 'Please provide a value for other',
//         path: ['leadership_demographics_other'],
//       });
//     }
//   });
//
// const InternalYes = FunderZodSchema.extend({
//   internal_leadership_demographics_collection: z.literal('yes'),
//   ...LeadershipDemographicsSchema.innerType().shape,
// });
//
// const InternalNo = FunderZodSchema.extend({
//   internal_leadership_demographics_collection: z.literal('no'),
//   leadership_demographics: z.array(z.string()).optional(),
//   leadership_demographics_other: z.string().optional(),
// });

// export const ProjectSchemaUnion = z.discriminatedUnion(
//   'internal_leadership_demographics_collection',
//   [InternalYes, InternalNo],
// );

export type FunderSchema = z.infer<typeof FunderZodSchema>;

export const validator = (formValues: FunderSchema) => {
  const { success, error } = FunderZodSchema.safeParse(formValues);

  if (success) return {};

  return error.format();

  // const validationMap: {
  //   projects: ReturnType<typeof ProjectSchemaUnion.safeParse>;
  //   demographics: ReturnType<typeof LeadershipDemographicsSchema.safeParse>;
  // } = {
  //   projects: null,
  //   demographics: null,
  // };
  //
  // validationMap.projects = ProjectSchemaUnion.safeParse(formValues);
  //
  // Object.keys(validationMap).forEach((key) => {
  //   if (validationMap[key] === null) {
  //     delete validationMap[key];
  //   }
  // });
  //
  // if (formValues.internal_leadership_demographics_collection === 'yes') {
  //   validationMap.demographics = LeadershipDemographicsSchema.safeParse(formValues);
  // }
  //
  // if (Object.values(validationMap).every((v) => v.success)) {
  //   return {};
  // }
  //
  // return Object.values(validationMap).reduce((acc, validation) => {
  //   if (!validation.error) {
  //     return acc;
  //   }
  //
  //   return {
  //     ...acc,
  //     ...validation.error.format(),
  //   };
  // }, {});
};
