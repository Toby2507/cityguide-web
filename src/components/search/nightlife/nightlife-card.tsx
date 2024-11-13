'use client';

import { RatingCard } from '@/components';
import { usePriceConversion } from '@/hooks';
import { addFavouriteProperty, getUser, removeFavouriteProperty } from '@/server';
import { INightLife, PropertyType } from '@/types';
import { paths } from '@/utils';
import { Button, Chip, Image, Link } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { GiDress } from 'react-icons/gi';
import { IoCalendarSharp, IoCard } from 'react-icons/io5';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { PiMusicNoteFill } from 'react-icons/pi';
import { TbParkingCircle } from 'react-icons/tb';

const SearchNightlifeCard = ({
  _id,
  address,
  avatar,
  locationInfo,
  rating,
  reviewCount,
  name,
  type,
  currency,
  details: { entryFee, paymentOptions },
  rules: { minAge, parking, dressCode, musicGenre },
}: INightLife) => {
  const { convertPrice } = usePriceConversion();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFavourite, setIsFavourite] = useState<boolean>(false);

  const validAddr =
    address.fullAddress || [address.name, address.city, address.state, address.country].filter(Boolean).join(', ');
  const nightlifeDetails = [
    { title: 'Parking', value: parking, Icon: TbParkingCircle },
    { title: 'Min age', value: `${minAge}+ years`, Icon: IoCalendarSharp },
    { title: 'Payment', value: paymentOptions.join(', '), Icon: IoCard },
  ];
  if (dressCode) nightlifeDetails.push({ title: 'Dress code', value: dressCode?.join(', '), Icon: GiDress });
  if (musicGenre) nightlifeDetails.push({ title: 'Music Genre', value: musicGenre?.join(', '), Icon: PiMusicNoteFill });

  const toggleFavourite = async () => {
    setIsLoading(true);
    try {
      if (isFavourite) {
        await removeFavouriteProperty(_id);
        setIsFavourite(false);
      } else {
        await addFavouriteProperty(_id, PropertyType.STAY);
        setIsFavourite(true);
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      const user = await getUser();
      const favProps = user?.favouriteProperties ?? [];
      setIsFavourite(!!favProps.find((prop) => prop.propertyId === _id));
    })();
  }, [_id]);
  return (
    <article className="grid grid-cols-10 gap-4 border rounded-xl p-2 bg-white shadow-lg">
      <figure className="relative col-span-3 h-full w-full">
        <Image
          src={avatar}
          width="full"
          alt={name}
          radius="sm"
          className="aspect-square object-cover rounded-xl w-full"
        />
        <Button
          color="primary"
          className="absolute top-1 right-1 bg-white z-[99999]"
          isIconOnly
          isLoading={isLoading}
          radius="full"
          size="sm"
          onPress={toggleFavourite}
          variant="flat"
        >
          {isFavourite ? (
            <MdFavorite className="text-primary" size={20} />
          ) : (
            <MdFavoriteBorder className="text-primary" size={20} />
          )}
        </Button>
      </figure>
      <div className="col-span-7 flex flex-col gap-1 pr-1">
        <Chip size="sm" className="text-sm" color="primary" radius="sm" variant="flat">
          <span className="text-xs font-medium tracking-wider">{type}</span>
        </Chip>
        <div className="flex flex-col gap-4">
          <header className="flex justify-between gap-6 w-full">
            <div className="flex flex-col max-w-fit">
              <h3 className="text-xl text-primary font-semibold tracking-wide">{name}</h3>
              <p className="text-xs text-primary underline">{validAddr}</p>
              {locationInfo ? (
                <p className="text-xs text-gray-600">
                  {locationInfo.distanceInWords} / {locationInfo.duration} from the selected location.
                </p>
              ) : null}
            </div>
            <RatingCard rating={rating} reviewCount={reviewCount} size="sm" />
          </header>
          <div className="border-l border-accentGray2 pl-4 flex gap-10">
            <div className="flex-1 flex flex-col gap-2">
              <p className="font-bold">Nightlife Details</p>
              <div className="flex flex-wrap items-center gap-2">
                {nightlifeDetails.map(({ title, value, Icon }) => (
                  <div key={title} className="flex items-center gap-1">
                    <Icon color="text-default" size={16} />
                    <p className="text-xs font-light">{value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-start gap-2">
              <p className="text-xs font-light">{entryFee ? 'Entry fee required' : 'No entry fee required'}</p>
              {entryFee ? (
                <p className="text-2xl tracking-tighter font-medium">
                  {convertPrice(entryFee, currency)}
                  <span className="text-xs tracking-normal"> / Person</span>
                </p>
              ) : null}
              <Link href={paths.nightlifeDetail(_id)}>
                <Button color="primary" radius="sm" className="font-medium tracking-wide px-8">
                  View Nightlife
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default SearchNightlifeCard;
