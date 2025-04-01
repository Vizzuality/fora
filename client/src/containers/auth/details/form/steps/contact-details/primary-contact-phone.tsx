import { useState } from 'react';

import { Field as FieldRF } from 'react-final-form';
import { PhoneInput } from 'react-international-phone';

import ErrorField from '@/components/forms/error-field';
import { useFunderForm } from '@/containers/auth/details/form';
import { FunderSchema } from '@/containers/auth/details/form/validations';
import { cn } from '@/lib/utils';

export default function PrimaryContactPhone() {
  const { getState } = useFunderForm();
  const {
    values: { primary_contact_phone: primaryContactPhoneFormValue },
  } = getState();
  const [focus, setFocus] = useState(false);

  return (
    <FieldRF<FunderSchema['primary_contact_phone']> name="primary_contact_phone">
      {({ input }) => (
        <>
          <PhoneInput
            defaultCountry="us"
            value={primaryContactPhoneFormValue}
            inputClassName="focus:ring-0"
            className={cn('flex items-center rounded-lg border border-grey-40', {
              'focus-within:border focus-within:border-green-0': focus,
            })}
            onChange={(_phone) => {
              input.onChange(_phone);
            }}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
          />
          <ErrorField<FunderSchema> name="primary_contact_phone" />
        </>
      )}
    </FieldRF>
  );
}
