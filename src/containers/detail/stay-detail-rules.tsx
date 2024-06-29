'use client';

import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';

const StayDetailRules = () => {
  return (
    <section className="flex flex-col gap-4 pb-10" id="rules">
      <header className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold capitalize">House Rules</h1>
        <p className="flex items-center gap-1 text-sm text-accentGray font-medium">We take special requests too!</p>
      </header>
      <Table className="border border-default rounded-lg p-4 gap-20" hideHeader removeWrapper aria-label="House rules">
        <TableHeader>
          <TableColumn>Rule</TableColumn>
          <TableColumn>Description</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow className="border-b border-default">
            <TableCell className="py-4 font-medium">Check-in</TableCell>
            <TableCell className="py-4 text-accentGray w-9/12">Specific time chosen on reservation</TableCell>
          </TableRow>
          <TableRow className="border-b border-default">
            <TableCell className="py-4 font-medium">Check-out</TableCell>
            <TableCell className="py-4 text-accentGray w-9/12">From 7:00am - 10:00am</TableCell>
          </TableRow>
          <TableRow className="border-b border-default">
            <TableCell className="py-4 font-medium">Cancellation</TableCell>
            <TableCell className="py-4 text-accentGray w-9/12">
              The terms of prepayment and cancellation differ depending on the kind of lodging. When choosing an option,
              make sure to check any possible conditions.
            </TableCell>
          </TableRow>
          <TableRow className="border-b border-default">
            <TableCell className="py-4 font-medium">Age Requirement</TableCell>
            <TableCell className="py-4 text-accentGray w-9/12">No age requirement</TableCell>
          </TableRow>
          <TableRow className="border-b border-default">
            <TableCell className="py-4 font-medium">Pets</TableCell>
            <TableCell className="py-4 text-accentGray w-9/12">Pets are not allowed</TableCell>
          </TableRow>
          <TableRow className="border-b border-default">
            <TableCell className="py-4 font-medium">Groups</TableCell>
            <TableCell className="py-4 text-accentGray w-9/12">
              When booking more than 10 rooms, different policies and additional supplements may apply.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="py-4 font-medium">Payment method</TableCell>
            <TableCell className="py-4 text-accentGray w-9/12">Payments will be made on site.</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </section>
  );
};

export default StayDetailRules;
