'use client';

import { IAccommodation, Parking } from '@/types';
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, User } from '@nextui-org/react';
import Link from 'next/link';
import { useCallback } from 'react';
import { FaUserAlt } from 'react-icons/fa';

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
  const renderCell = useCallback((user: IAccommodation, columnKey: string) => {
    switch (columnKey) {
      case 'name':
        return (
          <div className="flex flex-col gap-2">
            <h4 className="text-xl text-primary font-semibold">{user.name}</h4>
            <ul className="flex flex-col gap-1">
              {user.rooms.map((room, idx) => (
                <li key={idx}>
                  <span className="font-bold">{room.name}: </span>
                  <span className="font-medium">
                    {room.beds.map((bed) => `${bed.count} ${bed.type} bed`).join(', ')}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        );
      case 'maxGuests':
        return (
          <div className="flex items-center gap-1">
            <FaUserAlt />
            {user.maxGuests < 5 ? (
              Array(user.maxGuests - 1)
                .fill(0)
                .map((_, idx) => <FaUserAlt key={idx} />)
            ) : (
              <p className="text-bold text-sm capitalize">x{user.maxGuests - 1}</p>
            )}
          </div>
        );
      case 'price':
        return <p className="font-semibold">${user.price}</p>;
      case 'available':
        return <p className="font-semibold">{user.available}</p>;
      case 'actions':
        return (
          <Button color="primary" className="px-12 font-semibold" radius="full">
            Reserve
          </Button>
        );
      default:
        return null;
    }
  }, []);
  return (
    <section className="flex flex-col gap-4 pb-10" id="availability">
      <header className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold capitalize">Availability</h1>
        <p className="flex items-center gap-1 text-sm text-accentGray font-medium">
          Prices and availability for your stay
        </p>
      </header>
      <Table
        isStriped
        removeWrapper
        aria-label="Accommodation availability"
        classNames={{
          td: 'justify-self-start bg-red',
          th: 'bg-primary text-white text-sm py-4',
        }}
      >
        <TableHeader className="bg-primary" columns={columns}>
          {(columns) => <TableColumn key={columns.key}>{columns.label}</TableColumn>}
        </TableHeader>
        <TableBody items={accomodations}>
          {(item) => (
            <TableRow key={item.id}>
              {columns.map(({ key }) => (
                <TableCell key={key} className="p-2">
                  {renderCell(item, key)}
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
