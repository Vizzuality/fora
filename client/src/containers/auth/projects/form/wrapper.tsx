import { Form, FormProps } from 'react-final-form';

import { ProjectSchema, validator } from './validations';

export default function FormWrapper<T = unknown>(formProps: FormProps<ProjectSchema & T>) {
  return <Form<ProjectSchema & T> validate={validator} {...formProps} />;
}
