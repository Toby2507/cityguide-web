'use client';

import { INightLife, IReservation, IRestaurant, IStay } from '@/types';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';

interface Props {
  property: IStay | IRestaurant | INightLife;
  reservation: IReservation;
}

const ReservationProperty = ({ property: { address, name } }: Props) => {
  return (
    <section className="col-span-9 flex flex-col gap-4 border-r p-6">
      <h2 className="text-lg font-semibold">Property Details</h2>
      <Table hideHeader removeWrapper aria-label="property details">
        <TableHeader>
          <TableColumn>Rule</TableColumn>
          <TableColumn>Description</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="flex items-center gap-2 font-medium text-accentGray">Property name</TableCell>
            <TableCell className="w-10/12 font-semibold">{name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="flex items-center gap-2 font-medium text-accentGray">Property location</TableCell>
            <TableCell className="w-10/12 font-semibold">{address.fullAddress}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </section>
  );
};

export default ReservationProperty;
