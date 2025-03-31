import { useForm, useFormState } from 'react-final-form';

import { Button } from '@/components/button/component';

export default function MyDetailsHeader() {
  const { invalid } = useFormState();
  const { submit } = useForm();

  return (
    <header className="grid grid-cols-12 items-center justify-between">
      <h2 className="col-span-10 truncate font-display text-3xl">My details</h2>
      <div className="col-span-2 flex justify-end">
        <Button type="submit" theme="green" disabled={invalid} onClick={submit}>
          Save changes
        </Button>
      </div>
    </header>
  );
}
