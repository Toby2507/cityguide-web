'use client';

import { IStay, StayType } from '@/types';
import { getFilterData, getMaxPrice, stayTypeFormat } from '@/utils';
import { Checkbox, CheckboxGroup, Slider, SliderValue } from '@nextui-org/react';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';

interface Props {
  stays: IStay[];
  filterStays: Dispatch<SetStateAction<IStay[] | undefined>>;
}

const SearchStayFilterBox = ({ stays, filterStays }: Props) => {
  const [selectedType, setSelectedType] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<SliderValue>([0, 500000]);

  const { stayTypes, maxPrice, ratings, maxDays, languages, distances } = useMemo(() => getFilterData(stays), [stays]);
  return (
    <>
      <div className="flex flex-col gap-2 border-b px-4 pt-2 pb-4">
        <CheckboxGroup
          classNames={{ label: '!text-sm text-black font-semibold' }}
          label="Stay Type: "
          onValueChange={setSelectedType}
          value={selectedType}
        >
          {Object.entries(stayTypes).map(([label, count]) => (
            <Checkbox classNames={{ base: 'max-w-full', label: 'w-full' }} key={label} value={label}>
              <div className="flex items-center justify-between gap-2 w-full">
                <p className="text-sm font-normal tracking-wide">{label}</p>
                <p className="text-sm font-light">{count}</p>
              </div>
            </Checkbox>
          ))}
        </CheckboxGroup>
      </div>
      <div className="flex flex-col gap-6 border-b px-4 pt-2 pb-4">
        <h4 className="text-sm text-black font-semibold">Your budget (per night):</h4>
        <Slider
          label="Select a budget"
          formatOptions={{ style: 'currency', currency: 'NGN' }}
          step={1000}
          maxValue={Math.max(1000, maxPrice)}
          minValue={0}
          value={priceRange}
          onChange={setPriceRange}
          className="max-w-md"
        />
      </div>
      <div className="flex flex-col gap-2 border-b px-4 pt-2 pb-4">
        <CheckboxGroup
          classNames={{ label: '!text-sm text-black font-semibold' }}
          label="Rating: "
          onValueChange={setSelectedType}
          value={selectedType}
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
      <div className="flex flex-col gap-2 border-b px-4 pt-2 pb-4">
        <CheckboxGroup
          classNames={{ label: '!text-sm text-black font-semibold' }}
          label="Max Reservation Days: "
          onValueChange={setSelectedType}
          value={selectedType}
        >
          {Object.entries(maxDays).map(([label, count]) => (
            <Checkbox classNames={{ base: 'max-w-full', label: 'w-full' }} key={label} value={label}>
              <div className="flex items-center justify-between gap-2 w-full">
                <p className="text-sm font-normal tracking-wide">{label}</p>
                <p className="text-sm font-light">{count}</p>
              </div>
            </Checkbox>
          ))}
        </CheckboxGroup>
      </div>
      <div className="flex flex-col gap-2 border-b px-4 pt-2 pb-4">
        <CheckboxGroup
          classNames={{ label: '!text-sm text-black font-semibold' }}
          label="Staff Spoken Language: "
          onValueChange={setSelectedType}
          value={selectedType}
        >
          {Object.entries(languages).map(([label, count]) => (
            <Checkbox classNames={{ base: 'max-w-full', label: 'w-full' }} key={label} value={label}>
              <div className="flex items-center justify-between gap-2 w-full">
                <p className="text-sm font-normal tracking-wide">{label}</p>
                <p className="text-sm font-light">{count}</p>
              </div>
            </Checkbox>
          ))}
        </CheckboxGroup>
      </div>
      <div className="flex flex-col gap-2 border-b px-4 pt-2 pb-4">
        <CheckboxGroup
          classNames={{ label: '!text-sm text-black font-semibold' }}
          label="Distance from selected address: "
          onValueChange={setSelectedType}
          value={selectedType}
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
    </>
  );
};

export default SearchStayFilterBox;
