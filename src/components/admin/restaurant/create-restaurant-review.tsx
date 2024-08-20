import { DetailPageAmenities, DetailPageOverview, RestaurantDetailInfo, RestaurantDetailMenu } from '@/containers';
import { ICreateRestaurant, ICustomAvailability, IRestaurant } from '@/types';
import { Button } from '@nextui-org/react';
import { Dispatch, SetStateAction } from 'react';
import { SubmitHandler, useFormContext } from 'react-hook-form';

interface Props {
  setStep: Dispatch<SetStateAction<number>>;
}

const CreateRestaurantReview = ({ setStep }: Props) => {
  const { handleSubmit, watch } = useFormContext<ICreateRestaurant>();
  const restaurant: IRestaurant = {
    ...watch(),
    availability: watch('availability') as ICustomAvailability[],
    _id: 'stay id 1',
    partner: 'partner id',
    createdAt: '2024-06-04T08:50:15.956Z',
    updatedAt: '2024-06-04T08:50:15.956Z',
    rating: 4.9,
  };

  const onSubmit: SubmitHandler<ICreateRestaurant> = async (data) => {};
  return (
    <div className="flex flex-col justify-center gap-4 pt-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl text-center font-semibold">Preview and Publish</h1>
        <p className="text-center font-light">
          Experience your restaurant through their eyes. Get a sneak peek at how your restaurant will be showcased to
          the diners.
        </p>
      </div>
      <div className="flex flex-col gap-4 max-w-7xl py-2 mx-auto w-full">
        <DetailPageOverview {...restaurant} amenities={restaurant.details.amenities || []} />
        <DetailPageAmenities amenities={restaurant.details.amenities || []} name={restaurant.name} />
        <RestaurantDetailMenu menu={restaurant.menu} />
        <RestaurantDetailInfo {...restaurant} />
      </div>
      <div className="flex flex-col gap-2 pb-10 mx-auto w-1/2">
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
