import { useField } from 'react-final-form';

export default function ErrorField<T = unknown>({ name }: { name: keyof T }) {
  const { meta } = useField<T>(name as string);

  if (meta.valid || !meta.modified) return null;

  return <span className="block text-red-700">{meta.error?._errors ?? meta.error}</span>;
}
