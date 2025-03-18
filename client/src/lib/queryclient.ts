import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      select: (data: any) => {
        return data.data;
      },
    },
  },
});

export function getQueryClient() {
  return queryClient;
}
