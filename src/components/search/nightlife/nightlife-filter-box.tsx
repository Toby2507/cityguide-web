'use client';

import { INightLife } from '@/types';
import { filterNightlifeResult, getNightlifeFilterData } from '@/utils';
import { Checkbox, CheckboxGroup, Slider, SliderValue } from '@nextui-org/react';
import slice from 'lodash/slice';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';

interface Props {
  nightlifes: INightLife[] | undefined;
  types?: string[];
  filterNightlifes: Dispatch<SetStateAction<INightLife[]>>;
}

const SearchNightlifeFilterBox = ({ nightlifes, types, filterNightlifes }: Props) => {
  const [paramUsed, setParamUsed] = useState<boolean>(false);
  const [type, setType] = useState<string[]>([]);
  const [rating, setRating] = useState<string[]>([]);
  const [distance, setDistance] = useState<string[]>([]);
  const [dresscode, setDresscode] = useState<string[]>([]);
  const [musicgenre, setMusicgenre] = useState<string[]>([]);
  const [parking, setParking] = useState<string[]>([]);
  const [payment, setPayment] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<SliderValue>([0, 10000000000]);

  const {
    nightlifeTypes,
    entryFees: { min, max },
    ratings,
    dresscodes,
    musicgenres,
    parkings,
    distances,
    payments,
  } = useMemo(() => getNightlifeFilterData(nightlifes || []), [nightlifes]);

  const isSingle = (val: string[], cb: Dispatch<SetStateAction<string[]>>) => {
    const newVal = slice(val, -1);
    cb(newVal);
  };

  useEffect(() => {
    if (nightlifes && types && !paramUsed) {
      setType(types);
      setParamUsed(true);
    }
  }, [nightlifes, types, paramUsed]);
  useEffect(() => {
    if (nightlifes)
      filterNightlifes(
        filterNightlifeResult(
          nightlifes,
          type,
          rating[0],
          dresscode,
          musicgenre,
          parking[0],
          distance[0],
          payment,
          (priceRange as number[])[0],
          (priceRange as number[])[1]
        )
      );
  }, [nightlifes, type, rating, dresscode, musicgenre, parking, distance, payment, priceRange, filterNightlifes]);
  return (
    <>
      {Object.values(nightlifeTypes).length ? (
        <div className="flex flex-col gap-2 border-b px-4 pt-2 pb-4">
          <CheckboxGroup
            classNames={{ label: '!text-sm text-black font-semibold' }}
            label="Stay Type: "
            onValueChange={setType}
            value={type}
          >
            {Object.entries(nightlifeTypes).map(([label, count]) => (
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
          value={priceRange}
          onChange={setPriceRange}
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
      {Object.values(dresscodes).length ? (
        <div className="flex flex-col gap-2 border-b px-4 pt-2 pb-4">
          <CheckboxGroup
            classNames={{ label: '!text-sm text-black font-semibold' }}
            label="Dress Codes: "
            onValueChange={setDresscode}
            value={dresscode}
          >
            {Object.entries(dresscodes).map(([label, count]) => (
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
      {Object.values(musicgenres).length ? (
        <div className="flex flex-col gap-2 border-b px-4 pt-2 pb-4">
          <CheckboxGroup
            classNames={{ label: '!text-sm text-black font-semibold' }}
            label="Music Genres: "
            onValueChange={setMusicgenre}
            value={musicgenre}
          >
            {Object.entries(musicgenres).map(([label, count]) => (
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
      {Object.values(parkings).length ? (
        <div className="flex flex-col gap-2 border-b px-4 pt-2 pb-4">
          <CheckboxGroup
            classNames={{ label: '!text-sm text-black font-semibold' }}
            label="Parking: "
            onValueChange={(val) => isSingle(val, setParking)}
            value={parking}
          >
            {Object.entries(parkings).map(([label, count]) => (
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

export default SearchNightlifeFilterBox;
