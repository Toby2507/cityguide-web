'use client';

import { AirtimeTransactionCell } from '@/components';
import { airtimeTransactionsColumns } from '@/data';
import { IAirtimeTransaction } from '@/types';
import { Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { useMemo, useState } from 'react';

interface Props {
  transactions: IAirtimeTransaction[];
  showPagination?: boolean;
}

const AirtimeTransactions = ({ transactions, showPagination }: Props) => {
  const [page, setPage] = useState<number>(1);
  const totalPages = useMemo(() => transactions.length / 10, [transactions]);
  const filteredTransactions = useMemo(() => transactions.slice((page - 1) * 10, page * 10), [page, transactions]);
  return (
    <section className="flex flex-col gap-2">
      <h2 className="text-2xl font-semibold">Airtime Transactions</h2>
      <div className="bg-gray100 flex flex-col gap-2 px-4 py-2 rounded-lg">
        <Table
          removeWrapper
          hideHeader
          aria-label="Airtime Transactions"
          classNames={{ table: 'border-separate border-spacing-y-2' }}
        >
          <TableHeader columns={airtimeTransactionsColumns}>
            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
          </TableHeader>
          <TableBody items={filteredTransactions}>
            {(item) => (
              <TableRow className="bg-white" key={item._id}>
                {airtimeTransactionsColumns.map(({ key }, idx) => (
                  <TableCell
                    key={key}
                    className={`bg-white${!idx ? ' rounded-l-xl' : ''}${idx === 2 ? ' rounded-r-xl' : ''}`}
                  >
                    <AirtimeTransactionCell columnKey={key} transaction={item} />
                  </TableCell>
                ))}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {showPagination ? (
        <Pagination
          isCompact
          showControls
          showShadow
          color="secondary"
          page={page}
          total={totalPages}
          onChange={(page) => setPage(page)}
        />
      ) : null}
    </section>
  );
};

export default AirtimeTransactions;
