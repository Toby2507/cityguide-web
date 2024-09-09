'use client';

import reservation from '@/containers/admin/home/reservation';
import { useReservationStore } from '@/providers';
import { IPartner, IRestaurant, IUserDetails } from '@/types';
import { paths } from '@/utils';
import { user, User, RadioGroup, Radio, Input } from '@nextui-org/react';
import dayjs from 'dayjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PiUserLight } from 'react-icons/pi';

interface Props {
  user: IUserDetails | null;
  restaurant: IRestaurant;
}

const RestaurantUserDetailReservation = ({ restaurant: { partner }, user }: Props) => {
  const pathname = usePathname();
  const { reservation, setReservation } = useReservationStore();
  const userDetails = [
    { name: 'First Name', value: user?.fullName.split(' ')[0] },
    { name: 'Last Name', value: user?.fullName.split(' ')[1] },
    { name: 'Email Address', value: user?.email },
    { name: 'Phone Number', value: user?.phoneNumber },
  ];
  const cancellation = (partner as IPartner).cancellationPolicy;
  const cancellationDeadline =
    cancellation && dayjs(reservation?.checkInDay).subtract(cancellation.daysFromReservation - 1, 'd');
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
    </section>
  );
};

export default RestaurantUserDetailReservation;
