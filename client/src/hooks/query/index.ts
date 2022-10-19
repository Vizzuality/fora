import { useMemo } from 'react';

import Jsona from 'jsona';

const dataFormatter = new Jsona();

export function useJsona<T>(data) {
  const DATA = useMemo(() => {
    if (!data) {
      return [];
    }

    if (data.pages) {
      return data.pages.map((d) => dataFormatter.deserialize(d) as T).flat();
    }

    return dataFormatter.deserialize(data) as T;
  }, [data]);

  return DATA;
}
