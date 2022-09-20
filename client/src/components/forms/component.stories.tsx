import { ReactNode } from 'react';

import { Form as FormRFF, Field as FieldRFF } from 'react-final-form';

import Button from 'components/button';
import Checkbox from 'components/forms/checkbox';
import Input from 'components/forms/input';
import Label from 'components/forms/label';
import Radio from 'components/forms/radio';
import Select, { Option } from 'components/forms/select';
import Textarea from 'components/forms/textarea';
import { composeValidators, booleanValidator, arrayValidator } from 'components/forms/validations';

const StoryForms = {
  title: 'Components/Forms',
  parameters: { actions: { argTypesRegex: '^on.*' } },
};

export default StoryForms;

const OPTIONS = [
  { label: 'Option 1', value: 'option-1' },
  { label: 'Option 2', value: 'option-2' },
  { label: 'Option 3', value: 'option-3', disabled: true },
  { label: 'Option 4', value: 'option-4' },
];

export function Form(): ReactNode {
  return (
    <FormRFF
      onSubmit={(values) => {
        console.info(values);
      }}
    >
      {(fprops) => (
        <form onSubmit={fprops.handleSubmit} autoComplete="off">
          {/* NAME */}
          <div>
            <FieldRFF name="name" validate={composeValidators([{ presence: true }])}>
              {(flprops) => (
                <>
                  <Label htmlFor="form-name" className="mb-3 uppercase">
                    Name
                  </Label>
                  <Input id="form-name" {...flprops} />
                </>
              )}
            </FieldRFF>
          </div>

          {/* EMAIL */}
          <div className="mt-5">
            <FieldRFF name="email" validate={composeValidators([{ presence: true, email: true }])}>
              {(flprops) => (
                <>
                  <Label htmlFor="form-email" className="mb-3 uppercase">
                    Email
                  </Label>
                  <Input id="form-email" type="email" {...flprops} />
                </>
              )}
            </FieldRFF>
          </div>

          {/* TEXTAREA */}
          <div className="mt-5">
            <FieldRFF
              name="description"
              validate={composeValidators([{ presence: true, length: { minimum: 20 } }])}
            >
              {(flprops) => (
                <>
                  <Label htmlFor="form-description" className="mb-3 uppercase">
                    Description
                  </Label>
                  <Textarea id="form-description" {...flprops} rows={4} />
                </>
              )}
            </FieldRFF>
          </div>

          {/* SELECT */}
          <div className="mt-5">
            <FieldRFF name="category" validate={composeValidators([{ presence: true }])}>
              {(flprops) => (
                <>
                  <Label htmlFor="form-select" className="mb-3 uppercase">
                    Category
                  </Label>
                  <Select
                    {...flprops.input}
                    placeholder="Select..."
                    theme="light"
                    size="md"
                    clearable
                    render={(selected) => <div>{selected.label}</div>}
                  >
                    {OPTIONS.map(({ label, value, disabled }) => (
                      <Option
                        key={value}
                        value={value}
                        theme="light"
                        label={label}
                        disabled={disabled}
                      >
                        {label}
                      </Option>
                    ))}
                  </Select>
                </>
              )}
            </FieldRFF>
          </div>

          {/* CHECKBOX */}
          <div className="mt-5">
            <Label className="mb-3 uppercase">Checkbox</Label>
            <FieldRFF
              name="checkbox"
              type="checkbox"
              validate={composeValidators([booleanValidator])}
            >
              {(flprops) => (
                <div className="flex mt-2">
                  <Checkbox id="form-checkbox" {...flprops} />
                  <Label htmlFor="form-checkbox" className="ml-2">
                    This is a standalone checkbox
                  </Label>
                </div>
              )}
            </FieldRFF>
          </div>

          {/* CHECKBOX GROUP */}
          <div className="mt-5">
            <Label className="mb-3 uppercase">Checkbox group</Label>
            <FieldRFF
              name="checkbox-group"
              type="checkbox"
              value="option-1"
              validate={composeValidators([arrayValidator])}
            >
              {(flprops) => (
                <div className="flex mt-2">
                  <Checkbox id="form-checkbox-group-1" {...flprops} />
                  <Label htmlFor="form-checkbox-group-1" className="ml-2">
                    Option 1
                  </Label>
                </div>
              )}
            </FieldRFF>

            <FieldRFF
              name="checkbox-group"
              type="checkbox"
              value="option-2"
              validate={composeValidators([arrayValidator])}
            >
              {(flprops) => (
                <div className="flex mt-2">
                  <Checkbox id="form-checkbox-group-2" {...flprops} />
                  <Label htmlFor="form-checkbox-group-2" className="ml-2">
                    Option 2
                  </Label>
                </div>
              )}
            </FieldRFF>

            <FieldRFF
              name="checkbox-group"
              type="checkbox"
              value="option-3"
              validate={composeValidators([arrayValidator])}
            >
              {(flprops) => (
                <div className="flex mt-2">
                  <Checkbox id="form-checkbox-group-3" {...flprops} />
                  <Label htmlFor="form-checkbox-group-3" className="ml-2">
                    Option 3
                  </Label>
                </div>
              )}
            </FieldRFF>
          </div>

          {/* RADIO GROUP */}
          <div className="mt-5">
            <Label className="mb-3 uppercase">Radio group</Label>
            <FieldRFF
              name="radio-group"
              type="radio"
              value="option-1"
              validate={composeValidators([{ presence: true }])}
            >
              {(flprops) => (
                <div className="flex mt-2">
                  <Radio id="radio-group-option-1" {...flprops} />
                  <Label htmlFor="radio-group-option-1" className="ml-2">
                    Option 1
                  </Label>
                </div>
              )}
            </FieldRFF>

            <FieldRFF
              name="radio-group"
              type="radio"
              value="option-2"
              validate={composeValidators([{ presence: true }])}
            >
              {(flprops) => (
                <div className="flex mt-2">
                  <Radio id="radio-group-option-2" {...flprops} />
                  <Label htmlFor="radio-group-option-2" className="ml-2">
                    Option 2
                  </Label>
                </div>
              )}
            </FieldRFF>

            <FieldRFF
              name="radio-group"
              type="radio"
              value="option-3"
              validate={composeValidators([{ presence: true }])}
            >
              {(flprops) => (
                <div className="flex mt-2">
                  <Radio id="radio-group-option-3" {...flprops} />
                  <Label htmlFor="radio-group-option-3" className="ml-2">
                    Option 3
                  </Label>
                </div>
              )}
            </FieldRFF>
          </div>

          <div className="mt-10">
            <Button theme="black" size="base" type="submit">
              Submit
            </Button>
          </div>
        </form>
      )}
    </FormRFF>
  );
}
