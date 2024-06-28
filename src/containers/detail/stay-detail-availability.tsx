'use client';

import { StayDetailTableCell } from '@/components';
import { IAccommodation, Parking } from '@/types';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import { useCallback, useMemo, useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { IoCheckmark } from 'react-icons/io5';

const accomodations: IAccommodation[] = [
  {
    id: 'accommodation_1',
    name: 'Cozy Beachfront Cabin',
    description:
      'This charming cabin offers stunning ocean views and is just steps from the beach. Perfect for a relaxing getaway.',
    rooms: [
      {
        name: 'Master Bedroom',
        beds: [{ type: 'King', count: 1 }],
      },
      {
        name: 'Guest Bedroom',
        beds: [{ type: 'Twin', count: 2 }],
      },
    ],
    maxGuests: 4,
    bathrooms: 2,
    children: true,
    infants: true,
    breakfast: true,
    parking: Parking.FREE,
    size: 120,
    initialAvailable: 5,
    available: 5,
    amenities: ['Wifi', 'Air conditioning', 'Hot tub'],
    price: 150.0,
  },
  {
    id: 'accommodation_2',
    name: 'Modern City Apartment',
    description:
      'Enjoy the convenience of city living in this stylish apartment. Close to restaurants, shops, and public transportation.',
    rooms: [
      {
        name: 'Studio',
        beds: [{ type: 'Queen', count: 1 }],
      },
    ],
    maxGuests: 2,
    bathrooms: 1,
    children: false,
    infants: false,
    breakfast: false,
    parking: Parking.PAID,
    initialAvailable: 10,
    available: 8,
    price: 100.0,
  },
];

const columns = [
  { key: 'name', label: 'Accommodation Detail' },
  { key: 'maxGuests', label: 'Max Number of Guest' },
  { key: 'price', label: "Today's Price" },
  { key: 'available', label: 'Quantity to be booked' },
  { key: 'actions', label: ' ' },
];

const StayDetailAvailability = () => {
  return (
    <section className="flex flex-col gap-4 pb-10" id="availability">
      <header className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold capitalize">Availability</h1>
        <p className="flex items-center gap-1 text-sm text-accentGray font-medium">
          Prices and availability for your stay
        </p>
      </header>
      <Table isStriped removeWrapper aria-label="Accommodation availability">
        <TableHeader columns={columns}>
          {(columns) => (
            <TableColumn className="bg-primary text-white text-sm py-4" key={columns.key}>
              {columns.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={accomodations}>
          {(item) => (
            <TableRow key={item.id}>
              {columns.map(({ key }) => (
                <TableCell key={key} className="justify-self-start bg-red align-top p-4">
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
