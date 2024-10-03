'use client';

import { useReservationStore } from '@/providers';
import { IRestaurant, IUserDetails } from '@/types';
import { generateTimeRange, paths } from '@/utils';
import { Button, Input, Radio, RadioGroup, Select, SelectItem, Textarea, User } from '@nextui-org/react';
import dayjs from 'dayjs';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import toast from 'react-hot-toast';
import { PiCheckCircle, PiUserLight } from 'react-icons/pi';
import { SlArrowRight } from 'react-icons/sl';

interface Props {
  user: IUserDetails | null;
  restaurant: IRestaurant;
}

const RestaurantUserDetailReservation = ({ restaurant: { availability, cancellationPolicy }, user }: Props) => {
  const { push } = useRouter();
  const pathname = usePathname();
  const { reservation, setReservation } = useReservationStore();
  const userDetails = [
    { name: 'First Name', value: user?.fullName.split(' ')[0] },
    { name: 'Last Name', value: user?.fullName.split(' ')[1] },
    { name: 'Email Address', value: user?.email },
    { name: 'Phone Number', value: user?.phoneNumber },
  ];
  const cancellationDeadline =
    cancellationPolicy && dayjs(reservation?.checkInDay).subtract(cancellationPolicy.daysFromReservation - 1, 'd');
  const goodToKnow = useMemo(
    () => [
      ...(!cancellationPolicy
        ? ['Stay flexible: You can cancel for free anytime']
        : dayjs(cancellationDeadline).isBefore(dayjs())
        ? []
        : [
            `Stay flexible: You can cancel for free before ${
              dayjs(cancellationDeadline).isSame(dayjs())
                ? 'today'
                : dayjs(cancellationDeadline).format('ddd, MMM DD, YYYY')
            }`,
          ]),
      "You'll get the entire table to your self",
    ],
    [cancellationPolicy, cancellationDeadline]
  );
  const timeRange = availability.find((a) => a.day === dayjs(reservation?.checkInDay).format('dddd'));
  const times = timeRange
    ? generateTimeRange(timeRange.from, dayjs(`2000-01-01 ${timeRange.to}`).subtract(1, 'h').format('HH:mm'))
    : [];

  const setReservationtime = (time: string) => {
    const outTime = dayjs(`2000-01-01 ${time}`).add(1, 'h').format('HH:mm');
    setReservation({ checkInTime: time, checkOutTime: outTime });
  };
  const goToFinal = () => {
    if (!reservation?.checkInTime) return toast.error('Please select your estimated check-in time');
    if (!reservation?.checkOutTime) return toast.error('Please select your estimated check-out time');
    push(`${pathname}/complete`);
  };
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
      <article className="flex flex-col gap-2 border-2 rounded-xl px-6 py-4 pb-8">
        <h3 className="text-lg font-bold tracking-wide">Your arrival time</h3>
        <div className="flex items-center gap-2">
          <PiCheckCircle className="text-green-600" size={26} />
          <p className="text-sm">
            Your table(s) would be ready from {dayjs(`2000-01-01 ${reservation?.checkInTime}`).format('hh:mm A')} to{' '}
            {dayjs(`2000-01-01 ${reservation?.checkOutTime}`).format('hh:mm A')}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 pt-2">
          <Select
            selectedKeys={[reservation?.checkInTime || '']}
            onChange={(e) => setReservationtime(e.target.value)}
            isRequired
            label="Add your estimated arrival time"
            placeholder=" "
          >
            {times.map(({ key, label }) => (
              <SelectItem key={key}>{label}</SelectItem>
            ))}
          </Select>
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
      <Button
        className="self-end mt-2 w-fit"
        color="primary"
        endContent={<SlArrowRight />}
        onPress={goToFinal}
        radius="sm"
        size="lg"
      >
        Next: Final details
      </Button>
    </section>
  );
};

export default RestaurantUserDetailReservation;
