import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      select: (data: any) => {
        return data.data;
      },
      structuralSharing: false,
    },
  },
});

export function getQueryClient() {
  return queryClient;
}
