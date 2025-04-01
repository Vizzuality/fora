import { z } from 'zod';

import { ApplicationStatus } from '@/containers/auth/details/form/types';
import { CapitalAcceptances } from '@/types/api/capital-acceptance';
import { Demographic } from '@/types/api/demographic';
import { FunderLegalStatus } from '@/types/api/funder-legal-status';
import { FunderType } from '@/types/api/funder-type';

const LegalStatusSchema = z
  .object({
    funder_legal_status: z.string({
      message: 'Please select a legal status',
    }),
    funder_legal_status_other: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.funder_legal_status === FunderLegalStatus.Other && !data.funder_legal_status_other) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please provide a value for other',
        path: ['funder_legal_status_other'],
      });
    }
  });

const FunderTypeSchema = z
  .object({
    funder_type: z.nativeEnum(FunderType),
    funder_type_other: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.funder_type === FunderType.Other && !data.funder_type_other) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please provide a value for other',
        path: ['funder_type_other'],
      });
    }
  });

const ShowPrimaryEmailTypeSchema = z
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

const CapitalAcceptancesSchema = z
  .object({
    capital_acceptances: z.array(z.nativeEnum(CapitalAcceptances)),
    capital_acceptances_other: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (
      data.capital_acceptances.includes(CapitalAcceptances.Other) &&
      !data.capital_acceptances_other
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please provide a value for other',
        path: ['capital_acceptances_other'],
      });
    }
  });

const LeadershipDemographicsSchema = z
  .object({
    leadership_demographics: z.array(z.string()).min(1, {
      message: 'Please select at least one demography',
    }),
    leadership_demographics_other: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (
      data.leadership_demographics.includes(Demographic.Other) &&
      !data.leadership_demographics_other
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please provide a value for other',
        path: ['leadership_demographics_other'],
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
    number_staff_employees: z.number().min(1),
    application_status: z.nativeEnum(ApplicationStatus),
    new_to_regenerative_ag: z.union([z.literal('yes'), z.literal('no')]).default('yes'),
  })
  .extend({
    ...LegalStatusSchema.innerType().shape,
    ...FunderTypeSchema.innerType().shape,
    ...ShowPrimaryEmailTypeSchema.innerType().shape,
    ...CapitalAcceptancesSchema.innerType().shape,
    ...LeadershipDemographicsSchema.innerType().shape,
  });

export type FunderSchema = z.infer<typeof FunderZodSchema>;

export const validator = (formValues: FunderSchema) => {
  const { success, error } = FunderZodSchema.safeParse(formValues);

  if (success) return {};

  return error.format();
};
