'use client';

import { IRestaurant } from '@/types';
import { filterRestaurantResults, getRestaurantFilterData } from '@/utils';
import { Checkbox, CheckboxGroup, Slider, SliderValue } from '@nextui-org/react';
import slice from 'lodash/slice';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';

interface Props {
  restaurants?: IRestaurant[];
  prices?: string[];
  filterRestaurants: Dispatch<SetStateAction<IRestaurant[]>>;
}

const SearchRestaurantFilterBox = ({ restaurants, prices, filterRestaurants }: Props) => {
  const [paramUsed, setParamUsed] = useState<boolean>(false);
  const [priceRange, setPriceRange] = useState<string[]>([]);
  const [slider, setSlider] = useState<SliderValue>([0, 10000000000]);
  const [serviceStyle, setServiceStyle] = useState<string[]>([]);
  const [cuisine, setCuisine] = useState<string[]>([]);
  const [dietary, setDietary] = useState<string[]>([]);
  const [rating, setRating] = useState<string[]>([]);
  const [distance, setDistance] = useState<string[]>([]);
  const [payment, setPayment] = useState<string[]>([]);

  const {
    priceRanges,
    maxPrice: { max, min },
    ratings,
    distances,
    payments,
    dietaries,
    cuisines,
    serviceStyles,
  } = useMemo(() => getRestaurantFilterData(restaurants || []), [restaurants]);

  const isSingle = (val: string[], cb: Dispatch<SetStateAction<string[]>>) => {
    const newVal = slice(val, -1);
    cb(newVal);
  };

  useEffect(() => {
    if (restaurants && prices && !paramUsed) {
      setPriceRange(prices);
      setParamUsed(true);
    }
  }, [restaurants, prices, paramUsed]);
  useEffect(() => {
    if (restaurants)
      filterRestaurants(
        filterRestaurantResults(
          restaurants,
          priceRange,
          rating[0],
          serviceStyle,
          cuisine,
          dietary,
          distance[0],
          payment,
          (slider as number[])[0],
          (slider as number[])[1]
        )
      );
  }, [restaurants, priceRange, rating, serviceStyle, cuisine, dietary, distance, payment, slider, filterRestaurants]);
  return (
    <>
      {Object.values(priceRanges).length ? (
        <div className="flex flex-col gap-2 border-b px-4 pt-2 pb-4">
          <CheckboxGroup
            classNames={{ label: '!text-sm text-black font-semibold' }}
            label="Stay Type: "
            onValueChange={setPriceRange}
            value={priceRange}
          >
            {Object.entries(priceRanges).map(([label, count]) => (
              <Checkbox classNames={{ base: 'max-w-full', label: 'w-full' }} key={label} value={label}>
                <div className="flex items-center justify-between gap-2 w-full">
                  <p className="text-sm font-normal tracking-wide">{label}</p>
                  <p className="text-sm font-light">{count}</p>
                </div>
              </Checkbox>
            ))}
          </CheckboxGroup>
        </div>
      ) : null}
      <div className="flex flex-col gap-6 border-b px-4 pt-2 pb-4">
        <h4 className="text-sm text-black font-semibold">Your budget (per night):</h4>
        <Slider
          label="Select a budget"
          formatOptions={{ style: 'currency', currency: 'NGN' }}
          step={1000}
          maxValue={Math.max(1000, max)}
          minValue={Math.max(0, min)}
          value={slider}
          onChange={setSlider}
          className="max-w-md"
        />
      </div>
      {Object.values(ratings).length ? (
        <div className="flex flex-col gap-2 border-b px-4 pt-2 pb-4">
          <CheckboxGroup
            classNames={{ label: '!text-sm text-black font-semibold' }}
            label="Rating: "
            onValueChange={(val) => isSingle(val, setRating)}
            value={rating}
          >
            {Object.entries(ratings).map(([label, count]) => (
              <Checkbox classNames={{ base: 'max-w-full', label: 'w-full' }} key={label} value={label}>
                <div className="flex items-center justify-between gap-2 w-full">
                  <p className="text-sm font-normal tracking-wide">{label}</p>
                  <p className="text-sm font-light">{count}</p>
                </div>
              </Checkbox>
            ))}
          </CheckboxGroup>
        </div>
      ) : null}
      {Object.values(serviceStyles).length ? (
        <div className="flex flex-col gap-2 border-b px-4 pt-2 pb-4">
          <CheckboxGroup
            classNames={{ label: '!text-sm text-black font-semibold' }}
            label="Service Styles: "
            onValueChange={setServiceStyle}
            value={serviceStyle}
          >
            {Object.entries(serviceStyles).map(([label, count]) => (
              <Checkbox classNames={{ base: 'max-w-full', label: 'w-full' }} key={label} value={label}>
                <div className="flex items-center justify-between gap-2 w-full">
                  <p className="text-sm font-normal tracking-wide">{label}</p>
                  <p className="text-sm font-light">{count}</p>
                </div>
              </Checkbox>
            ))}
          </CheckboxGroup>
        </div>
      ) : null}
      {Object.values(cuisines).length ? (
        <div className="flex flex-col gap-2 border-b px-4 pt-2 pb-4">
          <CheckboxGroup
            classNames={{ label: '!text-sm text-black font-semibold' }}
            label="Cuisines: "
            onValueChange={setCuisine}
            value={cuisine}
          >
            {Object.entries(cuisines).map(([label, count]) => (
              <Checkbox classNames={{ base: 'max-w-full', label: 'w-full' }} key={label} value={label}>
                <div className="flex items-center justify-between gap-2 w-full">
                  <p className="text-sm font-normal tracking-wide">{label}</p>
                  <p className="text-sm font-light">{count}</p>
                </div>
              </Checkbox>
            ))}
          </CheckboxGroup>
        </div>
      ) : null}
      {Object.values(dietaries).length ? (
        <div className="flex flex-col gap-2 border-b px-4 pt-2 pb-4">
          <CheckboxGroup
            classNames={{ label: '!text-sm text-black font-semibold' }}
            label="Dietary Provisions: "
            onValueChange={setDietary}
            value={dietary}
          >
            {Object.entries(dietaries).map(([label, count]) => (
              <Checkbox classNames={{ base: 'max-w-full', label: 'w-full' }} key={label} value={label}>
                <div className="flex items-center justify-between gap-2 w-full">
                  <p className="text-sm font-normal tracking-wide">{label}</p>
                  <p className="text-sm font-light">{count}</p>
                </div>
              </Checkbox>
            ))}
          </CheckboxGroup>
        </div>
      ) : null}
      {Object.values(distances).length ? (
        <div className="flex flex-col gap-2 border-b px-4 pt-2 pb-4">
          <CheckboxGroup
            classNames={{ label: '!text-sm text-black font-semibold' }}
            label="Distance from selected address: "
            onValueChange={(val) => isSingle(val, setDistance)}
            value={distance}
          >
            {Object.entries(distances).map(([label, count]) => (
              <Checkbox classNames={{ base: 'max-w-full', label: 'w-full' }} key={label} value={label}>
                <div className="flex items-center justify-between gap-2 w-full">
                  <p className="text-sm font-normal tracking-wide">{label}</p>
                  <p className="text-sm font-light">{count}</p>
                </div>
              </Checkbox>
            ))}
          </CheckboxGroup>
        </div>
      ) : null}
      {Object.values(payments).length ? (
        <div className="flex flex-col gap-2 border-b px-4 pt-2 pb-4">
          <CheckboxGroup
            classNames={{ label: '!text-sm text-black font-semibold' }}
            label="Payment methods: "
            onValueChange={setPayment}
            value={payment}
          >
            {Object.entries(payments).map(([label, count]) => (
              <Checkbox classNames={{ base: 'max-w-full', label: 'w-full' }} key={label} value={label}>
                <div className="flex items-center justify-between gap-2 w-full">
                  <p className="text-sm font-normal tracking-wide">{label}</p>
                  <p className="text-sm font-light">{count}</p>
                </div>
              </Checkbox>
            ))}
          </CheckboxGroup>
        </div>
      ) : null}
    </>
  );
};

export default SearchRestaurantFilterBox;
