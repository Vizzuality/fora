import { Form, FormProps } from 'react-final-form';

import { InvestmentSchema, validator } from './validations';

export default function FormWrapper<T = unknown>(formProps: FormProps<InvestmentSchema & T>) {
  return <Form<InvestmentSchema & T> validate={validator} {...formProps} />;
}
