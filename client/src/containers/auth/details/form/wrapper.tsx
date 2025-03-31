import { Form, FormProps } from 'react-final-form';

import { FunderSchema, validator } from './validations';

export default function FormWrapper<T = unknown>(formProps: FormProps<FunderSchema & T>) {
  return <Form<FunderSchema & T> validate={validator} {...formProps} />;
}
