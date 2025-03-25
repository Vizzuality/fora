import Link from 'next/link';

import { createColumnHelper } from '@tanstack/react-table';

import { CapitalTypeEnum, FundingTypeEnum } from '@/containers/auth/investments/form/types';
import InvestmentActions from '@/containers/auth/investments/table/actions';
import { formatDollar } from '@/lib/formats';
import { Investment } from '@/types/investment';

const columnHelper = createColumnHelper<Investment>();

const CAPITAL_TYPES_LABELS: Record<CapitalTypeEnum, string> = {
  [CapitalTypeEnum.Grants]: 'Grants',
  [CapitalTypeEnum.Debt]: 'Debt',
  [CapitalTypeEnum.Equity]: 'Equity',
  [CapitalTypeEnum.ForgivableLoans]: 'Forgivable Loans',
  [CapitalTypeEnum.Guarantees]: 'Guarantees',
  [CapitalTypeEnum.Mris]: 'MRIs',
  [CapitalTypeEnum.Pris]: 'PRIs',
  [CapitalTypeEnum.ReGrants]: 'Re-grants',
  [CapitalTypeEnum.Other]: 'Other',
};

const FUNDING_TYPES_LABELS: Record<FundingTypeEnum, string> = {
  [FundingTypeEnum.GeneralOperatingSupport]: 'General Operating Support',
  [FundingTypeEnum.MediaAndCommunications]: 'Media and Communications',
  [FundingTypeEnum.Other]: 'Other',
  [FundingTypeEnum.ProgramOrProjectSpecific]: 'Program or Project Specific',
  [FundingTypeEnum.Sponsorship]: 'Sponsorship',
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
        {cell.getValue() === 'other'
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
            {cell.getValue() === 'other'
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
