import { useForm, useFormState } from 'react-final-form';

import { Button } from 'components/button/component';

export default function NewProjectHeader() {
  const { invalid } = useFormState();
  const { submit } = useForm();

  return (
    <header className="flex justify-between items-center">
      <h2 className="text-3xl font-display">New project</h2>
      <Button type="submit" theme="green" disabled={invalid} onClick={submit}>
        Save changes
      </Button>
    </header>
  );
}
