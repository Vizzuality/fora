import { Field as FieldRFF } from 'react-final-form';

import { Radio } from '@/components/forms';
import { PrivacyEnum } from '@/containers/auth/investments/form/types';
import { InvestmentSchema } from '@/containers/auth/investments/form/validations';

const PRIVACY_TEXTS: Record<PrivacyEnum, string> = {
  [PrivacyEnum.All]:
    'Yes, all of the information can be shared on the platform, including non-aggregated funding amount.',
  [PrivacyEnum.AggregateAmountFunded]:
    'Yes, general information can be shared, but please ensure the funding amount is only included as aggregated data',
  [PrivacyEnum.AmountFundedVisibleOnlyToMembers]:
    'Yes, general information can be shared, but please keep the funding amount private to FORA members only and do not even include in the aggregated data',
  [PrivacyEnum.AmountFundedVisibleOnlyToStaff]:
    'Yes, general information can be shared, but please keep the funding amount private to FORA staff only and do not even include in the aggregated data',
  [PrivacyEnum.VisibleOnlyToMembers]:
    "No, I don't want any of this information to be available for the public. It can only be available to FORA members privately.",
  [PrivacyEnum.VisibleOnlyToStaff]:
    "No, I don't want any of this information included on the platform, or available to FORA members.",
};

export function Privacy() {
  return (
    <div className="grid grid-cols-12 flex-col gap-4">
      <label htmlFor="privacy" className="col-span-12 font-semibold">
        Can funding information be shared on the platform?
      </label>
      <div className="col-span-8 flex flex-col items-start gap-4">
        <div className="flex items-start gap-1">
          <FieldRFF<InvestmentSchema['privacy']>
            name="privacy"
            type="radio"
            value={PrivacyEnum.All}
          >
            {({ input }) => <Radio {...input} id="privacy-all" />}
          </FieldRFF>
          <label htmlFor="privacy-all">{PRIVACY_TEXTS.all}</label>
        </div>
        <div className="flex items-start gap-1">
          <FieldRFF<InvestmentSchema['privacy']>
            name="privacy"
            type="radio"
            value={PrivacyEnum.AggregateAmountFunded}
          >
            {({ input }) => <Radio {...input} id="privacy-aggregate_amount_funded" />}
          </FieldRFF>
          <label htmlFor="privacy-aggregate_amount_funded">
            {PRIVACY_TEXTS.aggregate_amount_funded}
          </label>
        </div>
        <div className="flex items-start gap-1">
          <FieldRFF<InvestmentSchema['privacy']>
            name="privacy"
            type="radio"
            value={PrivacyEnum.AmountFundedVisibleOnlyToMembers}
          >
            {({ input }) => <Radio {...input} id="privacy-amount_funded_visible_only_to_members" />}
          </FieldRFF>
          <label htmlFor="privacy-amount_funded_visible_only_to_members">
            {PRIVACY_TEXTS.amount_funded_visible_only_to_members}{' '}
            <span className="text-red-0">**</span>
          </label>
        </div>
        <div className="flex items-start gap-1">
          <FieldRFF<InvestmentSchema['privacy']>
            name="privacy"
            type="radio"
            value={PrivacyEnum.AmountFundedVisibleOnlyToStaff}
          >
            {({ input }) => <Radio {...input} id="privacy-amount_funded_visible_only_to_staff" />}
          </FieldRFF>
          <label htmlFor="privacy-amount_funded_visible_only_to_staff">
            {PRIVACY_TEXTS.amount_funded_visible_only_to_staff}{' '}
            <span className="text-red-0">**</span>
          </label>
        </div>
        <div className="flex items-start gap-1">
          <FieldRFF<InvestmentSchema['privacy']>
            name="privacy"
            type="radio"
            value={PrivacyEnum.VisibleOnlyToMembers}
          >
            {({ input }) => <Radio {...input} id="privacy-visible_only_to_members" />}
          </FieldRFF>
          <label htmlFor="privacy-visible_only_to_members">
            {PRIVACY_TEXTS.visible_only_to_members}
          </label>
        </div>
        <div className="flex items-start gap-1">
          <FieldRFF<InvestmentSchema['privacy']>
            name="privacy"
            type="radio"
            value={PrivacyEnum.VisibleOnlyToStaff}
          >
            {({ input }) => <Radio {...input} id="privacy-visible_only_to_staff" />}
          </FieldRFF>
          <label htmlFor="privacy-visible_only_to_staff">
            {PRIVACY_TEXTS.visible_only_to_staff}
          </label>
        </div>
      </div>
    </div>
  );
}
