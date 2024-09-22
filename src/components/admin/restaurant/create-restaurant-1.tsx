'use client';

import { priceRanges } from '@/data';
import { usePropertyStore } from '@/providers';
import { createRestaurantSchema } from '@/schemas';
import { ICreateRestaurant, PriceRange } from '@/types';
import { Button } from '@nextui-org/react';
import { useController, useFormContext } from 'react-hook-form';
import { RiMoneyDollarCircleFill } from 'react-icons/ri';

interface Props {
  setStep: (newStep: number) => void;
}

const CreateRestaurantStep1 = ({ setStep }: Props) => {
  const { control, watch } = useFormContext<ICreateRestaurant>();
  const { setRestaurant } = usePropertyStore();
  const {
    field: { onChange },
  } = useController({ control, name: 'priceRange' });

  const handleList = (key: PriceRange) => {
    const isValid = createRestaurantSchema.shape.priceRange.safeParse(key);
    if (!isValid.success) return;
    onChange(key);
    setStep(2);
    setRestaurant({ property: watch() });
  };
  return (
    <div className="flex flex-col justify-center gap-14 pt-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl text-center font-semibold">
          In no time at all, begin receiving diners by listing your restaurant on Cityguidex!
        </h1>
        <p className="text-center font-light">
          To get started, select the price range that best suits your restaurant on Cityguidex
        </p>
      </div>
      <div className="flex items-center justify-center gap-6">
        {priceRanges.map(({ key, name, desc }, idx) => (
          <article
            className="flex flex-col items-center justify-between gap-4 p-4 pt-8 rounded-xl border border-accentGray w-72"
            key={key}
          >
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center">
                {Array(idx + 1)
                  .fill(0)
                  .map((_, i) => (
                    <RiMoneyDollarCircleFill key={`${idx}-${i}`} className="text-primary text-6xl" />
                  ))}
              </div>
              <h4 className="text-xl font-semibold">{name}</h4>
              <p className="text-xs text-center font-light">{desc}</p>
            </div>
            <Button
              className="text-xs font-semibold rounded-full w-full"
              color="primary"
              onPress={() => handleList(key)}
            >
              List your property
            </Button>
          </article>
        ))}
      </div>
    </div>
  );
};

export default CreateRestaurantStep1;
