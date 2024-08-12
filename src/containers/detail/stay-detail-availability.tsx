'use client';

import { StayDetailTableCell } from '@/components';
import { IStay } from '@/types';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';

interface IProps {
  stay: IStay;
}

const columns = [
  { key: 'name', label: 'Accommodation Detail' },
  { key: 'maxGuests', label: 'Max Number of Guest' },
  { key: 'price', label: "Today's Price" },
  { key: 'available', label: 'Quantity to be booked' },
  { key: 'actions', label: ' ' },
];

const StayDetailAvailability = ({ stay }: IProps) => {
  return (
    <section className="flex flex-col gap-4 pb-10" id="availability">
      <header className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold capitalize">Availability</h1>
        <p className="flex items-center gap-1 text-sm text-accentGray font-medium">
          Prices and availability for your stay
        </p>
      </header>
      <Table isStriped removeWrapper aria-label="Accommodation availability" className="border-collapse">
        <TableHeader columns={columns}>
          {(columns) => (
            <TableColumn className="bg-default text-black text-sm py-4 border" key={columns.key}>
              {columns.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={stay.accommodation}>
          {(item) => (
            <TableRow key={item.id}>
              {columns.map(({ key }) => (
                <TableCell key={key} className="justify-self-start bg-red align-top p-4 border">
                  <StayDetailTableCell columnKey={key} user={item} />
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
