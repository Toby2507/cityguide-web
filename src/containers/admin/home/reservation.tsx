'use client';

import { ReservationCell } from '@/components';
import { reservationColumns } from '@/data';
import { getPartnerReservation } from '@/server';
import { IFullUser, Status } from '@/types';
import {
  Button,
  DatePicker,
  DateRangePicker,
  DateValue,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Pagination,
  RangeValue,
  Selection,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { BsSearch } from 'react-icons/bs';
import { IoChevronDownOutline, IoCloseCircle } from 'react-icons/io5';

dayjs.extend(utc);
dayjs.extend(timezone);
const AdminReservation = () => {
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [searchValue, setSearchValue] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<Selection>('all');
  const [reserveDateFilter, setReserveDateFilter] = useState<DateValue>();
  const [checkDateFilter, setCheckDateFilter] = useState<RangeValue<DateValue>>();
  const {
    data: reservations,
    isError,
    error,
  } = useSuspenseQuery({
    queryKey: ['reservations', 'admin'],
    queryFn: getPartnerReservation,
  });

  if (isError) toast.error(error?.message || 'Error fetching reservations');
  const isSearching = useMemo(() => Boolean(searchValue), [searchValue]);
  const filteredItems = useMemo(() => {
    let filteredRes = [...reservations];
    if (isSearching) {
      filteredRes = filteredRes.filter((res) =>
        `${(res.user as IFullUser).firstName} ${(res.user as IFullUser).lastName}`
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
    }
    if (statusFilter !== 'all' && Array.from(statusFilter).length !== Object.entries(Status).length)
      filteredRes = filteredRes.filter((res) => Array.from(statusFilter).includes(res.status));
    if (reserveDateFilter)
      filteredRes = filteredRes.filter((res) => dayjs(res.createdAt).isSame(reserveDateFilter.toString(), 'day'));
    if (checkDateFilter) {
      filteredRes = filteredRes.filter(
        (res) =>
          dayjs(res.checkInDay).isAfter(checkDateFilter.start.toString(), 'day') &&
          dayjs(res.checkOutDay).isBefore(checkDateFilter.end.toString(), 'day')
      );
    }
    return filteredRes;
  }, [isSearching, searchValue, statusFilter, reserveDateFilter, checkDateFilter, reservations]);
  const pages = useMemo(() => Math.ceil(filteredItems.length / rowsPerPage), [filteredItems, rowsPerPage]);
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, rowsPerPage, filteredItems]);
  const isFiltering = useMemo(
    () => searchValue || statusFilter !== 'all' || reserveDateFilter || checkDateFilter,
    [searchValue, statusFilter, reserveDateFilter, checkDateFilter]
  );

  const onRowsPerPageChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(+e.target.value);
    setPage(1);
  }, []);
  const onSearchChange = useCallback((value: string) => {
    setSearchValue(value);
    setPage(1);
  }, []);
  const onClear = useCallback(() => {
    setSearchValue('');
    setPage(1);
  }, []);
  const clearFilters = useCallback(() => {
    setStatusFilter('all');
    setReserveDateFilter(undefined);
    setCheckDateFilter(undefined);
    setPage(1);
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-32 items-end">
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
                {Object.values(Status).map((status) => (
                  <DropdownItem key={status} className="capitalize">
                    {status}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <DatePicker label="Creation Date" value={reserveDateFilter} onChange={setReserveDateFilter} />
            <DateRangePicker
              label="Check-in - Check-out"
              visibleMonths={2}
              value={checkDateFilter}
              onChange={setCheckDateFilter}
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-accentGray font-normal text-small">Total {reservations.length} reservations</span>
          <div className="flex items-center gap-4">
            <label className="flex items-center text-accentGray font-normal text-small">
              Rows per page:
              <select
                className="bg-transparent outline-none text-default-400 text-small"
                onChange={onRowsPerPageChange}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
            </label>
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
      </div>
    );
  }, [
    searchValue,
    statusFilter,
    checkDateFilter,
    reserveDateFilter,
    isFiltering,
    reservations,
    onClear,
    clearFilters,
    onRowsPerPageChange,
    onSearchChange,
  ]);
  return (
    <section className="flex flex-col gap-2 mt-6" id="reservations">
      <h2 className="text-2xl font-semibold">Reservations</h2>
      <Table
        removeWrapper
        aria-label="Reservations"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
        topContent={topContent}
        topContentPlacement="outside"
      >
        <TableHeader columns={reservationColumns}>
          {(columns) => (
            <TableColumn className="bg-primary text-white text-sm text-center py-4" key={columns.key}>
              {columns.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item._id}>
              {reservationColumns.map(({ key }) => (
                <TableCell key={key} className="justify-self-start bg-red p-4">
                  <ReservationCell columnKey={key} reservation={item} />
                </TableCell>
              ))}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </section>
  );
};

export default AdminReservation;
