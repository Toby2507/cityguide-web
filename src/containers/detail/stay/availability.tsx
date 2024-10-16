'use client';

import { StayDetailTableCell } from '@/components';
import { StaySearchBar } from '@/containers';
import { useReservationStore, useSearchStore } from '@/providers';
import { IAccommodation, ICreateReservation, IStay, PropertyType } from '@/types';
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';

interface IProps {
  stay: IStay;
  onUpdate?: () => void;
}

const columns = [
  { key: 'name', label: 'Accommodation Detail' },
  { key: 'maxGuests', label: 'Max Number of Guest' },
  { key: 'price', label: "Today's Price" },
  { key: 'options', label: 'Options' },
  { key: 'actions', label: ' ' },
];

const StayDetailAvailability = ({ stay, onUpdate }: IProps) => {
  const { setReservation } = useReservationStore();
  const { checkInDay, checkOutDay, noOfGuests, reservationCount } = useSearchStore();
  const [tableKey, setTableKey] = useState<string>('0');
  const [accommodations, setAccommodations] = useState<IAccommodation[]>(stay.accommodation);
  const firstStayId = accommodations.length ? accommodations[0].id : '';

  const handleSearch = () => {
    const acc = stay.accommodation.filter(
      (a) =>
        reservationCount <= a.available &&
        noOfGuests.adults + noOfGuests.children <= a.maxGuests &&
        !(noOfGuests.children && !a.children && !a.infants)
    );
    setAccommodations(acc.filter(Boolean));
    setTableKey(nanoid());
  };

  useEffect(() => {
    const reservation: ICreateReservation = {
      property: stay._id,
      propertyType: PropertyType.STAY,
      partner: typeof stay.partner === 'string' ? stay.partner : stay.partner._id,
      partnerType: stay.partnerType,
      checkInDay,
      checkInTime: dayjs(checkInDay).format('HH:mm'),
      checkOutDay,
      checkOutTime: dayjs(checkOutDay).format('HH:mm'),
      noOfGuests,
      reservationCount: 0,
      price: 0,
    };
    setReservation(reservation);
  }, [checkInDay, checkOutDay, noOfGuests, reservationCount, stay, setReservation]);
  useEffect(() => {
    setAccommodations(stay.accommodation);
    setTableKey(nanoid());
  }, [stay]);
  useEffect(() => {
    if (!onUpdate) handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section className="flex flex-col gap-4 pb-10" id="availability">
      <header className="flex items-center justify-between gap-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold capitalize">Availability</h1>
          <p className="flex items-center gap-1 text-sm text-accentGray font-medium">
            Prices and availability for your stay
          </p>
        </div>
        {onUpdate ? (
          <Button color="primary" className="px-10 font-semibold" onPress={onUpdate} radius="sm">
            Update Accommodations
          </Button>
        ) : null}
      </header>
      {!onUpdate ? <StaySearchBar extraClass="mt-1 w-10/12" noLocation search={handleSearch} /> : null}
      <Table key={tableKey} isStriped removeWrapper aria-label="Accommodation availability" className="border-collapse">
        <TableHeader columns={columns}>
          {(columns) => (
            <TableColumn className="bg-default text-black text-sm py-4 border" key={columns.key}>
              {columns.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={accommodations}
          emptyContent={'No accommodation matches your requirements. Change your search criteria'}
        >
          {(item) => (
            <TableRow key={item.id}>
              {columns.map(({ key }) => (
                <TableCell
                  key={key}
                  className={`justify-self-start bg-red align-top p-4 border ${
                    key === 'actions' ? (item.id !== firstStayId ? 'hidden' : '') : ''
                  }`}
                  rowSpan={key === 'actions' && item.id === firstStayId ? 0 : 1}
                >
                  <StayDetailTableCell
                    columnKey={key}
                    user={item}
                    showAction={item.id === firstStayId}
                    type={stay.type}
                    isAdmin={!!onUpdate}
                    cancellationPolicy={stay.cancellationPolicy}
                  />
                </TableCell>
              ))}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </section>
  );
};

export default StayDetailAvailability;
