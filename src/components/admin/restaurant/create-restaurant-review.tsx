'use client';

import { DetailPageAmenities, DetailPageOverview, RestaurantDetailInfo, RestaurantDetailMenu } from '@/containers';
import { usePropertyStore } from '@/providers';
import { CreateRestaurantInput } from '@/schemas';
import { createRestaurant } from '@/server';
import { ICustomAvailability, IRestaurant, PropertyType } from '@/types';
import { paths } from '@/utils';
import { Button, CircularProgress, Link, Modal, ModalContent, useDisclosure } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';

interface Props {
  setStep: (newStep: number) => void;
}

const CreateRestaurantReview = ({ setStep }: Props) => {
  const { push } = useRouter();
  const { setRestaurant } = usePropertyStore();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { handleSubmit, watch } = useFormContext<CreateRestaurantInput>();
  const restaurant: IRestaurant = {
    ...watch(),
    availability: watch('availability').filter(Boolean) as ICustomAvailability[],
    _id: 'stay id 1',
    partner: 'partner id',
    createdAt: '2024-06-04T08:50:15.956Z',
    updatedAt: '2024-06-04T08:50:15.956Z',
    rating: 4.9,
    reviewCount: 500,
    cancellationPolicy: null,
    categoryRatings: {},
  };

  const onSubmit: SubmitHandler<CreateRestaurantInput> = async (data) => {
    setIsLoading(true);
    onOpen();
    await createRestaurant(data);
    setIsLoading(false);
    setRestaurant(null);
    setTimeout(() => push(paths.adminRestaurants()), 2000);
  };
  return (
    <div className="flex flex-col justify-center gap-4 pt-4">
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
        <ModalContent>
          {isLoading ? (
            <div className="flex flex-col items-center gap-4 py-10">
              <CircularProgress size="lg" color="primary" className="text-7xl" aria-label="Publishing restaurant..." />
              <p className="text-lg text-accentGray font-medium">Publishing Restaurant...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 px-4 py-10">
              <IoCheckmarkCircleOutline className="text-7xl" />
              <p className="text-lg font-medium">
                Restaurant Successfully <span className="text-primary">Published!</span>
              </p>
              <Link href={paths.adminRestaurants()}>
                <Button className="text-sm px-14 font-semibold w-fit" color="primary" radius="full" variant="flat">
                  Dashboard
                </Button>
              </Link>
            </div>
          )}
        </ModalContent>
      </Modal>
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl text-center font-semibold">Preview and Publish</h1>
        <p className="text-center font-light">
          Experience your restaurant through their eyes. Get a sneak peek at how your restaurant will be showcased to
          the diners.
        </p>
      </div>
      <div className="flex flex-col gap-4 max-w-7xl py-2 mx-auto w-full">
        <DetailPageOverview
          {...restaurant}
          amenities={restaurant.details.amenities || []}
          propType={PropertyType.RESTAURANT}
        />
        <DetailPageAmenities amenities={restaurant.details.amenities || []} name={restaurant.name} />
        <RestaurantDetailMenu menu={restaurant.menu} currency={restaurant.currency} />
        <RestaurantDetailInfo restaurant={restaurant} />
      </div>
      <div className="flex flex-col gap-2 mx-auto w-1/2">
        <Button
          className="text-sm font-semibold"
          color="primary"
          radius="full"
          variant="solid"
          onPress={() => handleSubmit(onSubmit)()}
        >
          Publish
        </Button>
        <Button
          className="text-sm font-semibold px-14"
          color="primary"
          radius="full"
          variant="flat"
          onPress={() => setStep(8)}
        >
          No I need to make a change
        </Button>
      </div>
    </div>
  );
};

export default CreateRestaurantReview;
