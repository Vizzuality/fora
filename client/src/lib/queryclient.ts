import { QueryClient } from '@tanstack/react-query';

export function getQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        structuralSharing: false,
        select: (data: any) => {
          return data.data;
        },
      },
    },
  });
}
