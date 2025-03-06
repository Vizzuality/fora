import { Form, FormProps } from 'react-final-form';

import { ProjectSchema, validator } from './validations';

export default function FormWrapper(formProps: FormProps<ProjectSchema>) {
  return <Form<ProjectSchema> validate={validator} {...formProps} />;
}
