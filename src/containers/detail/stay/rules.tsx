'use client';

import { IStay } from '@/types';
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { BsExclamationCircleFill } from 'react-icons/bs';
import { FaCalendarDays } from 'react-icons/fa6';
import { GiPartyPopper } from 'react-icons/gi';
import { IoCard, IoLogIn, IoLogOut } from 'react-icons/io5';
import { MdOutlineFamilyRestroom, MdOutlinePets } from 'react-icons/md';

interface IProps {
  stay: IStay;
  onUpdate?: () => void;
}

const StayDetailRules = ({ stay: { rules, accommodation, maxDays }, onUpdate }: IProps) => {
  const [checkInFrom, checkInTo] = rules.checkIn.split('-');
  const [checkOutFrom, checkOutTo] = rules.checkOut.split('-');

  const checkIn = useMemo(
    () => `${dayjs(`1-1-1 ${checkInFrom}`).format('hh:mm A')} - ${dayjs(`1-1-1 ${checkInTo}`).format('hh:mm A')}`,
    [checkInFrom, checkInTo]
  );
  const checkOut = useMemo(
    () => `${dayjs(`1-1-1 ${checkOutFrom}`).format('hh:mm A')} - ${dayjs(`1-1-1 ${checkOutTo}`).format('hh:mm A')}`,
    [checkOutFrom, checkOutTo]
  );
  const children = useMemo(() => accommodation.some((a) => a.children), [accommodation]);
  const infants = useMemo(() => accommodation.some((a) => a.infants), [accommodation]);
  return (
    <section className="flex flex-col gap-4 pb-10" id="rules">
      <header className="flex items-center justify-between gap-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold capitalize">House Rules</h1>
          <p className="flex items-center gap-1 text-sm text-accentGray font-medium">We take special requests too!</p>
        </div>
        {onUpdate ? (
          <Button color="primary" className="px-10 font-semibold" onPress={onUpdate} radius="sm">
            Update Stay Rules
          </Button>
        ) : null}
      </header>
      <Table className="border border-default rounded-lg p-4 gap-20" hideHeader removeWrapper aria-label="House rules">
        <TableHeader>
          <TableColumn>Rule</TableColumn>
          <TableColumn>Description</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow className="border-b border-default">
            <TableCell className="flex items-center gap-2 py-4 font-medium">
              <IoLogIn className="text-xl" />
              Check-in
            </TableCell>
            <TableCell className="py-4 text-accentGray w-9/12">{checkIn}</TableCell>
          </TableRow>
          <TableRow className="border-b border-default">
            <TableCell className="flex items-center gap-2 py-4 font-medium">
              <IoLogOut className="text-xl" />
              Check-out
            </TableCell>
            <TableCell className="py-4 text-accentGray w-9/12">{checkOut}</TableCell>
          </TableRow>
          <TableRow className="border-b border-default">
            <TableCell className="flex items-center gap-2 py-4 font-medium">
              <BsExclamationCircleFill className="text-lg" />
              Cancellation
            </TableCell>
            <TableCell className="py-4 text-accentGray w-9/12">
              The terms of prepayment and cancellation differ depending on the kind of lodging. When choosing an option,
              make sure to check any possible conditions.
            </TableCell>
          </TableRow>
          <TableRow className="border-b border-default">
            <TableCell className="flex items-center gap-2 py-4 font-medium">
              <MdOutlineFamilyRestroom className="text-lg" />
              Children & Infants
            </TableCell>
            <TableCell className="py-4 w-9/12">
              <p className="text-accentGray pb-2">
                Children of all ages are {children ? '' : 'not '}welcome at this property
              </p>
              <p className="text-accentGray">Infants are {infants ? '' : 'not '}welcome at this property</p>
            </TableCell>
          </TableRow>
          <TableRow className="border-b border-default">
            <TableCell className="flex items-center gap-2 py-4 font-medium">
              <MdOutlinePets className="text-lg" />
              Pets
            </TableCell>
            <TableCell className="py-4 text-accentGray w-9/12">Pets are{!rules.pets ? ' not' : ''} allowed</TableCell>
          </TableRow>
          <TableRow className="border-b border-default">
            <TableCell className="flex items-center gap-2 py-4 font-medium">
              <GiPartyPopper className="text-lg" />
              Parties
            </TableCell>
            <TableCell className="py-4 text-accentGray w-9/12">
              Parties are{!rules.parties ? ' not' : ''} allowed
            </TableCell>
          </TableRow>
          <TableRow className="border-b border-default">
            <TableCell className="flex items-center gap-2 py-4 font-medium">
              <IoCard className="text-lg" />
              Payment method
            </TableCell>
            <TableCell className="py-4 text-accentGray w-9/12">Payments will be made on site.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="flex items-center gap-2 py-4 font-medium">
              <FaCalendarDays className="text-lg" />
              Max Reservation Days
            </TableCell>
            <TableCell className="py-4 text-accentGray w-9/12">{maxDays} days</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </section>
  );
};

export default StayDetailRules;
