import { z } from 'zod';

import {
  CapitalTypeEnum,
  DurationGranInvestment,
  FundingTypeEnum,
  PrivacyEnum,
} from '@/containers/auth/investments/form/types';

const BaseInvestmentZodSchema = z.object({
  project_id: z
    .string({
      message: 'Please, select a project',
    })
    .uuid(),
  amount: z.number().positive(),
  year_invested: z.number().positive(),
  initial_funded_year: z.number().positive(),
  areas: z.array(z.string()).min(1, {
    message: 'Please select at least one area',
  }),
  areas_other: z.string().optional(),
  privacy: z.nativeEnum(PrivacyEnum).default(PrivacyEnum.All),
  countries: z.array(z.string()).min(1),
  states: z.array(z.string()).optional(),
});

const GrantSchema = z
  .object({
    grant_duration: z.nativeEnum(DurationGranInvestment),
    number_of_grant_years: z.number().positive().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.grant_duration === 'multi_year' && !data.number_of_grant_years) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please provide the number of years',
        path: ['number_of_grant_years'],
      });
    }
  });

const CapitalTypeAndFundingTypeSchema = z
  .object({
    capital_type: z.nativeEnum(CapitalTypeEnum),
    capital_type_other: z.string().optional(),
    funding_type: z.nativeEnum(FundingTypeEnum).optional(),
    funding_type_other: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.capital_type === 'grants' && !data.funding_type) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Funding type is mandatory for grants',
        path: ['funding_type'],
      });
    }

    if (data.capital_type === 'other' && !data.capital_type_other) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please provide a capital',
        path: ['capital_type_other'],
      });
    }

    if (data.funding_type === 'other' && !data.funding_type_other) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please provide a value for other',
        path: ['funding_type_other'],
      });
    }
  });

const FundingSchema = z
  .object({
    funding_type: z.nativeEnum(FundingTypeEnum),
    funding_type_other: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.funding_type === 'other' && !data.funding_type_other) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please provide a value for other',
        path: ['funding_type_other'],
      });
    }
  });

const DemographicsSchema = z
  .object({
    demographics: z.array(z.string()).min(1, {
      message: 'Please select at least one demography',
    }),
    demographics_other: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.demographics.includes('other') && !data.demographics_other) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please provide a value for other',
        path: ['demographics_other'],
      });
    }
  });

const InvestmentZodSchema = BaseInvestmentZodSchema.extend({
  ...FundingSchema.innerType().shape,
  ...GrantSchema.innerType().shape,
  ...DemographicsSchema.innerType().shape,
  ...CapitalTypeAndFundingTypeSchema.innerType().shape,
});

const InternalYes = InvestmentZodSchema.extend({
  internal_demographics_collection: z.literal('yes'),
  ...DemographicsSchema.innerType().shape,
});

const InternalNo = InvestmentZodSchema.extend({
  internal_demographics_collection: z.literal('no'),
  demographics: z.array(z.string()).optional(),
  demographics_other: z.string().optional(),
});

export const InvestmentSchemaUnion = z.discriminatedUnion('internal_demographics_collection', [
  InternalYes,
  InternalNo,
]);

export type InvestmentSchema = z.infer<typeof InvestmentSchemaUnion>;

export const validator = (formValues: InvestmentSchema) => {
  const validationMap: {
    investment: ReturnType<typeof InvestmentSchemaUnion.safeParse>;
    demographics: ReturnType<typeof DemographicsSchema.safeParse>;
    capitalAndFunding: ReturnType<typeof CapitalTypeAndFundingTypeSchema.safeParse>;
  } = {
    investment: null,
    demographics: null,
    capitalAndFunding: null,
  };

  validationMap.investment = InvestmentSchemaUnion.safeParse(formValues);
  validationMap.capitalAndFunding = CapitalTypeAndFundingTypeSchema.safeParse(formValues);

  Object.keys(validationMap).forEach((key) => {
    if (validationMap[key] === null) {
      delete validationMap[key];
    }
  });

  if (formValues.internal_demographics_collection === 'yes') {
    validationMap.demographics = DemographicsSchema.safeParse(formValues);
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
