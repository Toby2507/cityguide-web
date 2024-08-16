'use client';

import { StayDetailTableCell } from '@/components';
import { useReservationStore, useSearchStore } from '@/providers';
import { IAccommodation, IStay, PropertyType } from '@/types';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import StaySearchBar from '../home/stay-search';

interface IProps {
  stay: IStay;
}

const columns = [
  { key: 'name', label: 'Accommodation Detail' },
  { key: 'maxGuests', label: 'Max Number of Guest' },
  { key: 'price', label: "Today's Price" },
  { key: 'options', label: 'Options' },
  { key: 'actions', label: ' ' },
];

const StayDetailAvailability = ({ stay }: IProps) => {
  const { setReservation } = useReservationStore();
  const { noOfGuests, reservationCount } = useSearchStore();
  const [tableKey, setTableKey] = useState<number>(0);
  const [accommodations, setAccommodations] = useState<IAccommodation[]>(stay.accommodation);
  const firstStayId = accommodations.length ? accommodations[0].id : '';
  const lastStayId = accommodations.length ? accommodations[accommodations.length - 1].id : '';

  const actionClass = (id: string) => {
    if (id === firstStayId && accommodations.length > 1) return 'border-b-0';
    if (id === lastStayId && accommodations.length !== 1) return 'border-t-0';
    if (![firstStayId, lastStayId].includes(id)) return 'border-y-0';
  };
  const handleSearch = () => {
    const acc = stay.accommodation.filter(
      (a) =>
        reservationCount <= a.available &&
        noOfGuests.adults + noOfGuests.children <= a.maxGuests &&
        !(noOfGuests.children && !a.children && !a.infants)
    );
    setAccommodations(acc.filter(Boolean));
    setTableKey((prev) => prev + 1);
  };

  useEffect(() => {
    const reservation = {
      property: stay._id,
      propertyType: PropertyType.STAY,
      partner: typeof stay.partner === 'string' ? stay.partner : stay.partner._id,
      partnerType: stay.partnerType,
    };
    setReservation(reservation);
  }, [stay, setReservation]);
  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section className="flex flex-col gap-4 pb-10" id="availability">
      <header className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold capitalize">Availability</h1>
        <p className="flex items-center gap-1 text-sm text-accentGray font-medium">
          Prices and availability for your stay
        </p>
      </header>
      <StaySearchBar extraClass="mt-1 w-10/12" noLocation search={handleSearch} />
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
                    key === 'actions' ? actionClass(item.id) : ''
                  }`}
                >
                  <StayDetailTableCell
                    columnKey={key}
                    user={item}
                    showAction={item.id === firstStayId}
                    type={stay.type}
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
