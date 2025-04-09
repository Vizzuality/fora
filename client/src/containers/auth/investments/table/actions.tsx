import Link from 'next/link';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi';

import API from '@/services/api';

export default function InvestmentActions({ investmentId }: { investmentId: string }) {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ['delete-investment', investmentId],
    mutationFn: () => {
      return API.request({
        method: 'DELETE',
        url: `/members/investments/${investmentId}`,
        data: null,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.accessToken}`,
        },
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'my-investments',
      });
    },
  });

  return (
    <ul className="flex items-center justify-end gap-2 pr-5">
      <li className="flex">
        <Link href={`/auth/investments/${investmentId}/edit`}>
          <HiOutlinePencilAlt className="h-6 w-6 text-grey-20" />
        </Link>
      </li>
      <li className="flex">
        <button type="button" onClick={() => mutation.mutate()}>
          <HiOutlineTrash className="h-6 w-6 text-grey-20" />
        </button>
      </li>
    </ul>
  );
}
