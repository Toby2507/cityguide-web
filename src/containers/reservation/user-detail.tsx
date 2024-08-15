'use client';

import { UserDetailReservationAccommodation } from '@/components';
import { useReservationStore } from '@/providers';
import { IStay, IUserDetails } from '@/types';
import { paths } from '@/utils';
import {
  Checkbox,
  CheckboxGroup,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Textarea,
  User,
} from '@nextui-org/react';
import dayjs from 'dayjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoCarSportOutline } from 'react-icons/io5';
import { LiaShuttleVanSolid } from 'react-icons/lia';
import { PiCheckCircle, PiTaxi, PiUserLight } from 'react-icons/pi';

interface Props {
  user: IUserDetails | null;
  stay: IStay;
}
interface ITimes {
  key: string;
  label: string;
}

const generateTimeRange = (from: string, to: string) => {
  const times: ITimes[] = [];
  let curr = dayjs(`2000-01-01 ${from}`);
  let end = dayjs(`2000-01-01 ${to}`);
  if (end.isBefore(curr)) end = end.add(1, 'd');
  while (curr.isBefore(end) || curr.isSame(end)) {
    times.push({
      key: curr.format('HH:mm'),
      label: curr.format('hh:mm A'),
    });
    curr = curr.add(1, 'h');
  }
  return times;
};

const UserDetailReservation = ({ stay: { accommodation, rules }, user }: Props) => {
  const pathname = usePathname();
  const { reservation, setReservation } = useReservationStore();
  const userDetails = [
    { name: 'First Name', value: user?.fullName.split(' ')[0] },
    { name: 'Last Name', value: user?.fullName.split(' ')[1] },
    { name: 'Email Address', value: user?.email },
    { name: 'Phone Number', value: user?.phoneNumber },
  ];
  const goodToKnow = [
    'Stay flexible: You can cancel for free before June 27, 2024',
    "You'll get the entire accommodation to your self",
    "No payment needed today, You'll pay at the property",
  ];
  const accommodations =
    reservation?.accommodations
      ?.map((a) => {
        const acc = accommodation.find((acc) => acc.id === a.accommodationId);
        if (acc) return { details: acc, quantity: a.reservationCount, guests: a.noOfGuests };
        return;
      })
      .filter(Boolean) || [];
  const [checkInFrom, checkInTo] = rules.checkIn.split('-');
  const [checkOutFrom, checkOutTo] = rules.checkOut.split('-');
  const [inTimes, outTimes] = [generateTimeRange(checkInFrom, checkInTo), generateTimeRange(checkOutFrom, checkOutTo)];

  return (
    <section className="flex flex-col gap-2">
      <article className="flex flex-col gap-3 border-2 rounded-xl px-6 py-4">
        {user ? (
          <div className="flex items-center justify-start">
            <User
              as="div"
              name={<p className="text-primary text-xs font-semibold pl-1">{user.fullName}</p>}
              description={<p className="text-xs pl-1">{user.email}</p>}
              avatarProps={{ isBordered: true, src: user.imgUrl || '', color: 'primary', size: 'sm' }}
            />
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <PiUserLight className="text-primary" size={24} />
            <p className="text-sm">
              <Link className="text-primary" href={paths.login(pathname)}>
                Log in
              </Link>
              &nbsp;to continue with your saved details or&nbsp;
              <Link className="text-primary" href={paths.register(pathname)}>
                register
              </Link>
              &nbsp;to manage your reservations on the go.
            </p>
          </div>
        )}
      </article>
      <article className="flex flex-col gap-2 border-2 rounded-xl px-6 py-4">
        <h3 className="text-lg font-bold tracking-wide">Your details</h3>
        <p className="text-sm text-accentGray tracking-wide font-medium px-6 py-4 bg-gray-200 rounded-xl">
          Almost done! Just fill in the required <span className="text-danger">*</span> details
        </p>
        <div className="grid grid-cols-2 gap-x-8 gap-y-2 pt-4">
          {userDetails.map(({ name, value }) => (
            <div className="flex items-center gap-6" key={name}>
              <p className="text-xs text-primary font-semibold col-span-2">{name}</p>
              <p className="text-base col-span-3">{value}</p>
            </div>
          ))}
        </div>
        <div className="border-b mt-6 mb-2" />
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold">Who are you making the reservation for?</p>
          <RadioGroup
            onValueChange={(key) => setReservation({ isAgent: key === 'another' })}
            value={reservation?.isAgent ? 'another' : 'myself'}
            size="sm"
          >
            <Radio className="font-normal" value="myself">
              I&apos;m the main guest
            </Radio>
            <Radio className="font-normal" value="another">
              I&apos;m making the reservation for someone else
            </Radio>
          </RadioGroup>
          {reservation?.isAgent ? (
            <div className="grid grid-cols-2 gap-4 pt-3">
              <Input
                name="guest name"
                label="Guest Full name"
                labelPlacement="inside"
                placeholder=" "
                size="sm"
                value={reservation?.guestFullName}
                isRequired
                onValueChange={(guestFullName) => setReservation({ guestFullName })}
                className="text-accentGray"
              />
              <Input
                name="guest email"
                label="Guest Email"
                labelPlacement="inside"
                placeholder=" "
                size="sm"
                value={reservation?.guestEmail}
                isRequired
                onValueChange={(guestEmail) => setReservation({ guestEmail })}
                className="text-accentGray"
              />
            </div>
          ) : null}
        </div>
      </article>
      <article className="flex flex-col gap-2 border-2 rounded-xl px-6 py-4">
        <h3 className="text-lg font-bold tracking-wide">Good to know</h3>
        <div className="flex flex-col gap-1">
          {goodToKnow.map((info) => (
            <div className="flex items-center gap-2" key={info}>
              <PiCheckCircle className="text-green-600" size={24} />
              <p className="text-sm font-light">{info}</p>
            </div>
          ))}
        </div>
      </article>
      {accommodations.map((a) => (
        <UserDetailReservationAccommodation key={a?.details.id} {...a!} />
      ))}
      <article className="flex flex-col gap-2 border-2 rounded-xl px-6 py-4 pb-8">
        <h3 className="text-lg font-bold tracking-wide">Add to your stay</h3>
        <div className="flex flex-col gap-4">
          <CheckboxGroup value={reservation?.requests || []} onValueChange={(requests) => setReservation({ requests })}>
            <Checkbox className="w-full" value="I'm interested in requesting an airport shuttle">
              <div className="grid grid-cols-10 items-center gap-12 pl-2 w-full">
                <div className="col-span-9">
                  <p className="text-sm">I&apos;m interested in requesting an airport shuttle</p>
                  <p className="text-sm font-light">
                    We’ll tell your accommodations that you’re interested, so they can provide details and costs.
                  </p>
                </div>
                <LiaShuttleVanSolid size={50} />
              </div>
            </Checkbox>
            <Checkbox className="w-full" value="I'm interested in renting a car">
              <div className="grid grid-cols-10 items-center gap-12 pl-2 w-full">
                <div className="col-span-9">
                  <p className="text-sm">I&apos;m interested in renting a car</p>
                  <p className="text-sm font-light">
                    Make the most of your trip – check out car rental options in your booking confirmation.
                  </p>
                </div>
                <IoCarSportOutline size={50} />
              </div>
            </Checkbox>
            <Checkbox className="w-full" value="I'm interested in booking a taxi">
              <div className="grid grid-cols-10 items-center gap-12 pl-2 w-full">
                <div className="col-span-9">
                  <p className="text-sm">I&apos;m interested in booking a taxi</p>
                  <p className="text-sm font-light">
                    Avoid surprises – get from the airport to your accommodations without any hassle. We&apos;ll add
                    taxi options to your booking confirmation.
                  </p>
                </div>
                <PiTaxi size={50} />
              </div>
            </Checkbox>
          </CheckboxGroup>
        </div>
      </article>
      <article className="flex flex-col gap-2 border-2 rounded-xl px-6 py-4 pb-8">
        <h3 className="text-lg font-bold tracking-wide">Special request</h3>
        <p className="text-xs font-medium">
          Special request can’t be granted, but the property will do it’s best to meet your needs. You can always make a
          special request after your booking is completed.
        </p>
        <div className="flex flex-col gap-2 pt-3">
          <p className="text-sm font-semibold">
            Please write your request in English <span className="text-xs text-accentGray font-medium">(optional)</span>
          </p>
          <Textarea
            value={reservation?.specialRequest || ''}
            onValueChange={(specialRequest) => setReservation({ specialRequest })}
            name="special request"
            radius="full"
            variant="bordered"
          />
        </div>
      </article>
      <article className="flex flex-col gap-2 border-2 rounded-xl px-6 py-4 pb-8">
        <h3 className="text-lg font-bold tracking-wide">Your arrival time</h3>
        <div className="flex items-center gap-2">
          <PiCheckCircle className="text-green-600" size={26} />
          <p className="text-sm">
            Your accommodation(s) would be ready for check in from {dayjs(`1-1-1 ${checkInFrom}`).format('hh:mm A')} to{' '}
            {dayjs(`1-1-1 ${checkInTo}`).format('hh:mm A')}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 pt-2">
          <Select
            selectedKeys={[reservation?.checkInTime || '']}
            onChange={(e) => setReservation({ checkInTime: e.target.value })}
            isRequired
            label="Add your estimated arrival time"
            placeholder=" "
          >
            {inTimes.map(({ key, label }) => (
              <SelectItem key={key}>{label}</SelectItem>
            ))}
          </Select>
          <Select
            selectedKeys={[reservation?.checkOutTime || '']}
            onChange={(e) => setReservation({ checkOutTime: e.target.value })}
            isRequired
            label="Add your estimated departure time"
            placeholder=" "
          >
            {outTimes.map(({ key, label }) => (
              <SelectItem key={key}>{label}</SelectItem>
            ))}
          </Select>
        </div>
      </article>
    </section>
  );
};

export default UserDetailReservation;
