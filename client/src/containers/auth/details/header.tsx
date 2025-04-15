import { useForm, useFormState } from 'react-final-form';

import { useSetAtom } from 'jotai/react';
import { LuCircleHelp } from 'react-icons/lu';

import { Button } from '@/components/button/component';
import { formModalAtom } from '@/containers/auth/store';

export default function MyDetailsHeader() {
  const { invalid } = useFormState();
  const { submit } = useForm();
  const setFormModal = useSetAtom(formModalAtom);

  return (
    <header className="grid grid-cols-12 items-center justify-between">
      <h2 className="col-span-10 truncate font-display text-3xl">My details</h2>
      <div className="col-span-2 flex items-center justify-end gap-4">
        <Button
          type="submit"
          theme="green"
          disabled={invalid}
          onClick={submit}
          className="shrink-0"
        >
          Save changes
        </Button>

        <button
          type="button"
          className="flex items-center gap-2 font-semibold text-grey-0"
          onClick={() => {
            setFormModal(true);
          }}
        >
          <LuCircleHelp className="h-5 w-5" />
          <span>Help</span>
        </button>
      </div>
    </header>
  );
}
