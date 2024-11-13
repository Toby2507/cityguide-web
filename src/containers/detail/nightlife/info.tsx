'use client';

import { usePriceConversion } from '@/hooks';
import { INightLife } from '@/types';
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import dayjs from 'dayjs';
import { GiDress } from 'react-icons/gi';
import { IoCalendarSharp, IoCard, IoPricetags } from 'react-icons/io5';
import { MdNightlife } from 'react-icons/md';
import { PiMusicNoteFill } from 'react-icons/pi';
import { TbParkingCircle } from 'react-icons/tb';

interface Props {
  nightlife: INightLife;
  onUpdate?: () => void;
}

const NightlifeDetailInfo = ({
  nightlife: {
    availability,
    type,
    currency,
    contact: { email, phone, socialMedia },
    details: { entryFee, paymentOptions },
    rules: { dressCode, minAge, musicGenre, parking },
  },
  onUpdate,
}: Props) => {
  const { convertPrice } = usePriceConversion();
  return (
    <section className="flex flex-col gap-4 pb-10" id="info">
      <header className="flex items-center justify-between gap-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold capitalize">Info and Details</h1>
          <p className="flex items-center gap-1 text-sm text-accentGray font-medium">
            Everything you need to know. Plan your visit with our essential information.
          </p>
        </div>
        {onUpdate ? (
          <Button color="primary" className="px-10 font-semibold" onPress={onUpdate} radius="sm">
            Update Nightlife Info
          </Button>
        ) : null}
      </header>
      <div className="grid grid-cols-7 gap-4">
        <div className="col-span-4 flex flex-col gap-4 border border-default rounded-xl p-6">
          <h4 className="text-lg text-black font-semibold">Open Days and Time</h4>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3">
            {availability.map((item) => (
              <div className="flex items-center justify-between gap-4" key={item?.day}>
                <p className="text-sm text-accentGray font-semibold">{item?.day}</p>
                <p className="text-xs text-accentGray font-medium">
                  {dayjs(`1-1-1 ${item?.from}`).format('hh:mm A')} - {dayjs(`1-1-1 ${item?.to}`).format('hh:mm A')}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-3 flex flex-col gap-2 border border-default rounded-xl p-6">
          <h4 className="text-lg text-black font-semibold">Contact Us</h4>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm text-accentGray font-semibold">Email Address</p>
              <p className="text-xs text-accentGray font-medium">{email}</p>
            </div>
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm text-accentGray font-semibold">Phone Number</p>
              <p className="text-xs text-accentGray font-medium">{phone}</p>
            </div>
            {socialMedia?.map(({ name, handle }) => (
              <div className="flex items-center justify-between gap-4" key={name}>
                <p className="text-sm text-accentGray font-semibold">{name}</p>
                <p className="text-xs text-accentGray font-medium">{handle}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Table className="border border-default rounded-lg p-4 gap-20" hideHeader removeWrapper aria-label="House rules">
        <TableHeader>
          <TableColumn>Rule</TableColumn>
          <TableColumn>Description</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow className="border-b border-default">
            <TableCell className="flex items-center gap-2 py-4 font-medium">
              <MdNightlife className="text-xl" />
              Nightlife Type
            </TableCell>
            <TableCell className="py-4 text-accentGray w-9/12">{type}</TableCell>
          </TableRow>
          <TableRow className="border-b border-default">
            <TableCell className="flex items-center gap-2 py-4 font-medium">
              <IoCalendarSharp className="text-xl" />
              Minimum Age
            </TableCell>
            <TableCell className="py-4 text-accentGray w-9/12">{minAge}+</TableCell>
          </TableRow>
          <TableRow className="border-b border-default">
            <TableCell className="flex items-center gap-2 py-4 font-medium">
              <IoPricetags className="text-xl" />
              Entry Fee
            </TableCell>
            <TableCell className="py-4 text-accentGray w-9/12">{convertPrice(entryFee ?? 0, currency)}</TableCell>
          </TableRow>
          <TableRow className="border-b border-default">
            <TableCell className="flex items-center gap-2 py-4 font-medium">
              <TbParkingCircle className="text-xl" />
              Parking
            </TableCell>
            <TableCell className="py-4 text-accentGray w-9/12">{parking}</TableCell>
          </TableRow>
          <TableRow className="border-b border-default">
            <TableCell className="flex items-center gap-2 py-4 font-medium">
              <GiDress className="text-xl" />
              Dress Code
            </TableCell>
            <TableCell className="py-4 text-accentGray w-9/12">
              {dressCode?.join(', ') || 'There is no dress code'}
            </TableCell>
          </TableRow>
          <TableRow className="border-b border-default">
            <TableCell className="flex items-center gap-2 py-4 font-medium">
              <PiMusicNoteFill className="text-xl" />
              Music Genres
            </TableCell>
            <TableCell className="py-4 text-accentGray w-9/12">
              {musicGenre?.join(', ') || 'There is no specific music genre'}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="flex items-center gap-2 py-4 font-medium">
              <IoCard className="text-xl" />
              Accepted Payment Method
            </TableCell>
            <TableCell className="py-4 text-accentGray w-9/12">{paymentOptions.join(', ')}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </section>
  );
};

export default NightlifeDetailInfo;
