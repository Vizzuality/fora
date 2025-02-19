import { Field, FormRenderProps, useForm, useFormState } from 'react-final-form';

export default function Form({ handleSubmit }: { handleSubmit: FormRenderProps['handleSubmit'] }) {
  const form = useForm();
  const { submitting, pristine } = useFormState();

  return (
    <form id="exampleForm" onSubmit={handleSubmit}>
      <div>
        <label>First Name</label>
        <Field name="firstName" component="input" type="text" placeholder="First Name" />
      </div>
      <div>
        <label>Last Name</label>
        <Field name="lastName" component="input" type="text" placeholder="Last Name" />
      </div>
      <div>
        <label>Favorite Color</label>
        <Field name="favoriteColor" component="select">
          <option />
          <option value="#ff0000">️ Red</option>
          <option value="#00ff00">Green</option>
          <option value="#0000ff">Blue</option>
        </Field>
      </div>
      <div className="buttons">
        <button type="submit" disabled={submitting || pristine}>
          Submit
        </button>
        <button type="button" onClick={form.reset} disabled={submitting || pristine}>
          Reset
        </button>
      </div>
    </form>
  );
}
