import { ComponentProps } from 'react';

import { Field as FieldRFF } from 'react-final-form';

import { Select } from '@/components/forms';
import ErrorField from '@/components/forms/error-field';
import { OrganizationType } from '@/containers/auth/details/form/types';
import { FunderSchema } from '@/containers/auth/details/form/validations';

const ORGANIZATION_TYPE_LABELS: Record<OrganizationType, string> = {
  [OrganizationType.Accelerator]: 'Accelerator',
  [OrganizationType.Advisory]: 'Advisory',
  [OrganizationType.Bank]: 'Bank',
  [OrganizationType.EducationalLandBased]: 'Educational Land Based',
  [OrganizationType.FamilyOffice]: 'Family Office',
  [OrganizationType.FunderCollaborativeNetwork]: 'Funder Collaborative or Network',
  [OrganizationType.Individual]: 'Individual',
  [OrganizationType.Initiative]: 'Initiative',
  [OrganizationType.LoanFund]: 'Loan Fund',
  [OrganizationType.PrivateFoundation]: 'Private Foundation',
  [OrganizationType.PublicFoundation]: 'Public Foundation',
  [OrganizationType.Regrantor]: 'Regrantor',
  [OrganizationType.Other]: 'Other (please specify)',
};

const ORGANIZATION_TYPE_OPTIONS: ComponentProps<typeof Select>['options'] = Object.entries(
  ORGANIZATION_TYPE_LABELS,
).map(([value]) => ({
  value,
  label: ORGANIZATION_TYPE_LABELS[value],
}));

export default function OrganizationTypeSelector() {
  return (
    <FieldRFF<FunderSchema['organization_type']> name="organization_type">
      {({ input }) => (
        <div className="space-y-2">
          <Select
            id="organization_type"
            placeholder="Select an option"
            theme="gray"
            size="base"
            options={ORGANIZATION_TYPE_OPTIONS}
            value={input.value}
            onSelect={input.onChange}
          />
          <ErrorField<FunderSchema> name="organization_type" />
        </div>
      )}
    </FieldRFF>
  );
}
