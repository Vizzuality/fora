import { Field as FieldRFF } from 'react-final-form';

import ErrorField from '@/components/forms/error-field';
import { useFunderForm } from '@/containers/auth/details/form';
import { FunderSchema } from '@/containers/auth/details/form/validations';
import VisibilityLabel from '@/containers/auth/projects/form/label';
import { Input, Radio } from 'components/forms';

export default function PrimaryEmailVisibility() {
  const { getState } = useFunderForm();
  const {
    values: { show_primary_email: showPrimaryEmailFormValue },
  } = getState();

  return (
    <>
      <div className="space-y-2">
        <VisibilityLabel
          labelProps={{
            htmlFor: 'show_primary_email',
            className: 'normal-case',
          }}
          required
        >
          Can primary contact email be displayed on the platform?
        </VisibilityLabel>
        <div className="flex items-center gap-4 pl-1">
          <div className="flex items-center gap-1.5">
            <FieldRFF<FunderSchema['show_primary_email']>
              name="show_primary_email"
              type="radio"
              value="yes"
            >
              {({ input }) => <Radio {...input} id="show_primary_email-yes" />}
            </FieldRFF>
            <label htmlFor="show_primary_email-yes">Yes</label>
          </div>

          <div className="flex items-center gap-1.5">
            <FieldRFF<FunderSchema['show_primary_email']>
              name="show_primary_email"
              type="radio"
              value="no"
            >
              {({ input }) => <Radio {...input} id="show_primary_email-no" />}
            </FieldRFF>
            <label htmlFor="internal_demographics_collection-no">No</label>
          </div>
        </div>
      </div>
      {showPrimaryEmailFormValue === 'no' && (
        <>
          <div className="space-y-2">
            <VisibilityLabel
              labelProps={{
                htmlFor: 'secondary_email_which_can_be_shared',
                className: 'normal-case',
              }}
              required
            >
              If no, is there an email that can be shared in the platform publicly? For example, it
              can be an &quot;info@&quot; email.
            </VisibilityLabel>
            <FieldRFF<FunderSchema['secondary_email_which_can_be_shared']>
              name="secondary_email_which_can_be_shared"
              type="email"
            >
              {({ input }) => (
                <div className="space-y-2">
                  <Input
                    {...input}
                    id={input.name}
                    required
                    theme="transparent"
                    className="h-[46px]"
                  />
                  <ErrorField<FunderSchema> name="secondary_email_which_can_be_shared" />
                </div>
              )}
            </FieldRFF>
          </div>
        </>
      )}
    </>
  );
}
