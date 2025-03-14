import { useField } from 'react-final-form';

export default function ErrorField<T = unknown>({ name }: { name: keyof T }) {
  const { meta } = useField<T>(name as string);

  if (meta.valid || !meta.modified) return null;

  return <span className="text-red-700 block">{meta.error?._errors ?? meta.error}</span>;
}
