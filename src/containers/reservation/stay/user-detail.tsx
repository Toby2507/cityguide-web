'use client';

import { UserDetailReservationAccommodation } from '@/components';
import { useReservationStore, useSearchStore } from '@/providers';
import { IStay, IUserDetails, StayType } from '@/types';
import { generateTimeRange, paths } from '@/utils';
import {
  Button,
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
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';
import { PiCheckCircle, PiUserLight } from 'react-icons/pi';
import { SlArrowRight } from 'react-icons/sl';

interface Props {
  user: IUserDetails | null;
  stay: IStay;
}

const UserDetailReservation = ({
  stay: { accommodation, rules, type, cancellationPolicy, optionalServices },
  user,
}: Props) => {
  const { push } = useRouter();
  const pathname = usePathname();
  const { checkInDay, checkOutDay } = useSearchStore();
  const { reservation, setReservation } = useReservationStore();
  const userDetails = [
    { name: 'First Name', value: user?.fullName.split(' ')[0] },
    { name: 'Last Name', value: user?.fullName.split(' ')[1] },
    { name: 'Email Address', value: user?.email },
    { name: 'Phone Number', value: user?.phoneNumber },
  ];
  const cancellationDeadline =
    cancellationPolicy && dayjs(checkInDay).subtract(cancellationPolicy.daysFromReservation - 1, 'd');
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
      "You'll get the entire accommodation to your self",
      ...(![StayType.APARTMENT, StayType.BnB].includes(type)
        ? ["No payment needed today, You'll pay at the property"]
        : []),
    ],
    [cancellationPolicy, cancellationDeadline, type]
  );
  const accommodations =
    reservation?.accommodations
      ?.map((a) => {
        const acc = accommodation.find((acc) => acc.id === a.accommodationId);
        if (acc) return { details: acc, quantity: a.reservationCount, guests: a.noOfGuests };
        return;
      })
      .filter(Boolean) || [];
  const [checkInFrom, checkInTo, inTimes, outTimes] = useMemo(() => {
    const [checkInFrom, checkInTo] = rules.checkIn.split('-');
    const [checkOutFrom, checkOutTo] = rules.checkOut.split('-');
    const [inTimes, outTimes] = [
      generateTimeRange(checkInFrom, checkInTo),
      generateTimeRange(checkOutFrom, checkOutTo),
    ];
    return [checkInFrom, checkInTo, inTimes, outTimes];
  }, [rules]);

  const goToFinal = () => {
    if (dayjs(reservation?.checkInDay).isBefore(dayjs()))
      return toast.error('Your checkin date is in the past! Kindly choose a date in the future');
    if (!reservation?.checkInTime) return toast.error('Please select your estimated arrival time');
    if (!reservation?.checkOutTime) return toast.error('Please select your estimated departure time');
    setReservation({ checkInDay, checkOutDay });
    push(`${pathname}/complete`);
  };

  useEffect(() => {
    setReservation({ checkInTime: inTimes[0].key, checkOutTime: outTimes[0].key });
  }, [inTimes, outTimes, setReservation]);
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
      {optionalServices.length ? (
        <article className="flex flex-col gap-2 border-2 rounded-xl px-6 py-4 pb-8">
          <h3 className="text-lg font-bold tracking-wide">Add to your stay</h3>
          <div className="flex flex-col gap-4">
            <CheckboxGroup
              value={reservation?.requests || []}
              onValueChange={(requests) => setReservation({ requests })}
            >
              {optionalServices.map(({ title, description }) => (
                <Checkbox key={title} className="w-full" value={title}>
                  <div className="gap-2 pl-2 w-full">
                    <p className="text-sm">{title}</p>
                    <p className="text-sm font-light">{description}</p>
                  </div>
                </Checkbox>
              ))}
            </CheckboxGroup>
          </div>
        </article>
      ) : null}
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

export default UserDetailReservation;
