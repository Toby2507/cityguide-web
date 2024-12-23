'use client';

import { AirtimeTransactionCell } from '@/components';
import { airtimeTransactionsColumns } from '@/data';
import { getVtuTransactions } from '@/server';
import { VTUStatus } from '@/types';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Pagination,
  Selection,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { IoChevronDownOutline, IoCloseCircle } from 'react-icons/io5';

interface Props {
  showPagination?: boolean;
  showFilters?: boolean;
}

const AirtimeTransactions = ({ showPagination, showFilters }: Props) => {
  const { data: transactions } = useSuspenseQuery({
    queryKey: ['vtu-transactions'],
    queryFn: getVtuTransactions,
  });
  const [page, setPage] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<Selection>('all');

  const isSearching = useMemo(() => Boolean(searchValue), [searchValue]);
  const isFiltering = useMemo(() => !!searchValue || statusFilter !== 'all', [searchValue, statusFilter]);
  const totalPages = useMemo(() => Math.ceil(transactions.length / 10), [transactions]);
  const filteredItems = useMemo(() => {
    let filteredTransactions = [...transactions];
    if (isSearching) {
      filteredTransactions = filteredTransactions.filter((transaction) => {
        const userName = `${transaction.firstName} ${transaction.lastName}`;
        return userName.toLowerCase().includes(searchValue.toLowerCase());
      });
    }
    if (statusFilter !== 'all' && Array.from(statusFilter).length !== 2)
      filteredTransactions = filteredTransactions.filter((transaction) =>
        Array.from(statusFilter).includes(transaction.status)
      );
    return filteredTransactions;
  }, [isSearching, searchValue, statusFilter, transactions]);
  const items = useMemo(() => {
    const start = (page - 1) * 10;
    const end = start + 10;
    return filteredItems.slice(start, end);
  }, [filteredItems, page]);

  const onClear = useCallback(() => {
    setSearchValue('');
    setPage(1);
  }, []);
  const onSearchChange = useCallback((val: string) => {
    setSearchValue(val);
    setPage(1);
  }, []);
  const clearFilters = useCallback(() => {
    setStatusFilter('all');
    setSearchValue('');
    setPage(1);
  }, []);

  const TopContent = useMemo(
    () => (
      <div className="flex justify-between gap-32 py-3">
        <Input
          isClearable
          className="w-1/2"
          placeholder="Search by name..."
          startContent={<BsSearch />}
          value={searchValue}
          onClear={() => onClear()}
          onValueChange={onSearchChange}
        />
        <div className="flex items-end gap-3">
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button
                className="w-full text-zinc-600 border"
                endContent={<IoChevronDownOutline className="text-small" />}
                variant="flat"
              >
                Status
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectedKeys={statusFilter}
              selectionMode="multiple"
              onSelectionChange={setStatusFilter}
            >
              {Object.values(VTUStatus).map((status) => (
                <DropdownItem key={status} className="capitalize">
                  {status}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          {isFiltering ? (
            <Button
              aria-label="Clear Filters"
              className="text-xs text-accentGray font-light gap-1"
              startContent={<IoCloseCircle className="text-danger text-2xl" />}
              onPress={clearFilters}
              variant="light"
            >
              Clear Filters
            </Button>
          ) : null}
        </div>
      </div>
    ),
    [clearFilters, isFiltering, onClear, onSearchChange, searchValue, setStatusFilter, statusFilter]
  );

  return (
    <section className="flex flex-col gap-2">
      <h2 className="text-2xl font-semibold">Airtime Transactions</h2>
      {showFilters ? TopContent : null}
      <div className="bg-gray100 rounded-lg py-2">
        <div className="px-4 max-h-[65vh] overflow-auto">
          <Table
            removeWrapper
            hideHeader
            aria-label="Airtime Transactions"
            classNames={{ table: 'border-separate border-spacing-y-2' }}
          >
            <TableHeader columns={airtimeTransactionsColumns}>
              {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody items={items}>
              {(item) => (
                <TableRow className="bg-white" key={item._id}>
                  {airtimeTransactionsColumns.map(({ key }, idx) => (
                    <TableCell
                      key={key}
                      className={`bg-white${!idx ? ' rounded-l-xl' : ''}${idx === 3 ? ' rounded-r-xl' : ''}`}
                    >
                      <AirtimeTransactionCell columnKey={key} transaction={item} />
                    </TableCell>
                  ))}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      {showPagination ? (
        <Pagination
          isCompact
          showControls
          showShadow
          color="secondary"
          className="self-center"
          page={page}
          total={totalPages}
          onChange={(page) => setPage(page)}
        />
      ) : null}
    </section>
  );
};

export default AirtimeTransactions;
