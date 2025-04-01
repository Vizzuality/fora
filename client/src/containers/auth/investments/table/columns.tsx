import Link from 'next/link';

import { createColumnHelper } from '@tanstack/react-table';

import InvestmentActions from '@/containers/auth/investments/table/actions';
import { formatDollar } from '@/lib/formats';
import { CapitalType } from '@/types/api/capital-type';
import { FundingType } from '@/types/api/funding-type';
import { Investment } from '@/types/api/investment';

const columnHelper = createColumnHelper<Investment>();

const CAPITAL_TYPES_LABELS: Record<CapitalType, string> = {
  [CapitalType.Grants]: 'Grants',
  [CapitalType.Debt]: 'Debt',
  [CapitalType.Equity]: 'Equity',
  [CapitalType.ForgivableLoans]: 'Forgivable Loans',
  [CapitalType.Guarantees]: 'Guarantees',
  [CapitalType.Mris]: 'MRIs',
  [CapitalType.Pris]: 'PRIs',
  [CapitalType.ReGrants]: 'Re-grants',
  [CapitalType.Other]: 'Other',
};

const FUNDING_TYPES_LABELS: Record<FundingType, string> = {
  [FundingType.GeneralOperatingSupport]: 'General Operating Support',
  [FundingType.MediaAndCommunications]: 'Media and Communications',
  [FundingType.Other]: 'Other',
  [FundingType.ProgramOrProjectSpecific]: 'Program or Project Specific',
  [FundingType.Sponsorship]: 'Sponsorship',
};

export const columns = [
  columnHelper.accessor('project', {
    id: 'project_name',
    header: () => <span className="pl-5">Project Name</span>,
    enableSorting: true,
    cell: ({ cell }) => (
      <Link
        href={`/projects/${cell.getValue().id}`}
        className="inline-block w-[275px] truncate overflow-ellipsis px-5 underline"
        title={cell.getValue().name}
      >
        {cell.getValue().name}
      </Link>
    ),
  }),
  columnHelper.accessor('amount', {
    header: () => <span>Amount</span>,
    enableSorting: true,
    cell: ({ cell }) => (
      <span>
        {formatDollar(cell.getValue(), {
          roundingPriority: 'morePrecision',
        })}
      </span>
    ),
  }),
  columnHelper.accessor('year_invested', {
    header: () => <span>Year</span>,
    enableSorting: true,
    cell: ({ cell }) => <span>{cell.getValue()}</span>,
  }),
  columnHelper.accessor('capital_type', {
    header: () => <span>Capital Type</span>,
    enableSorting: true,
    cell: ({ cell }) => (
      <span>
        {cell.getValue() === CapitalType.Other
          ? `${CAPITAL_TYPES_LABELS[cell.getValue()]} (${cell.row.original.capital_type_other})`
          : CAPITAL_TYPES_LABELS[cell.getValue()]}
      </span>
    ),
  }),
  columnHelper.accessor('funding_type', {
    header: () => <span>Funding Type</span>,
    enableSorting: true,
    cell: ({ cell }) => (
      <span>
        {cell.getValue() ? (
          <>
            {cell.getValue() === FundingType.Other
              ? `${FUNDING_TYPES_LABELS[cell.getValue()]} (${cell.row.original.funding_type_other})`
              : FUNDING_TYPES_LABELS[cell.getValue()]}
          </>
        ) : (
          'N/A'
        )}
      </span>
    ),
  }),
  columnHelper.display({
    id: 'actions',
    cell: ({ cell }) => <InvestmentActions investmentId={cell.row.original.id} />,
  }),
];
