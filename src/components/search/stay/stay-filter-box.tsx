'use client';

import { IStay } from '@/types';
import { getFilterData } from '@/utils';
import { Checkbox, CheckboxGroup, Slider, SliderValue } from '@nextui-org/react';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';

interface Props {
  stays: IStay[];
  filterStays: Dispatch<SetStateAction<IStay[] | undefined>>;
}

const SearchStayFilterBox = ({ stays, filterStays }: Props) => {
  const [selectedType, setSelectedType] = useState<string[]>([]);
  const [rating, setRating] = useState<string[]>([]);
  const [maxdays, setMaxdays] = useState<string[]>([]);
  const [language, setLanguage] = useState<string[]>([]);
  const [distance, setDistance] = useState<string[]>([]);
  const [payment, setPayment] = useState<string[]>([]);
  const [policy, setPolicy] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<SliderValue>([0, 500000]);

  const { stayTypes, maxPrice, ratings, maxDays, languages, distances, payments, policies } = useMemo(
    () => getFilterData(stays),
    [stays]
  );
  return (
    <>
      {Object.values(stayTypes).length ? (
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
      ) : null}
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
      {Object.values(ratings).length ? (
        <div className="flex flex-col gap-2 border-b px-4 pt-2 pb-4">
          <CheckboxGroup
            classNames={{ label: '!text-sm text-black font-semibold' }}
            label="Rating: "
            onValueChange={setRating}
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
      {Object.values(maxDays).length ? (
        <div className="flex flex-col gap-2 border-b px-4 pt-2 pb-4">
          <CheckboxGroup
            classNames={{ label: '!text-sm text-black font-semibold' }}
            label="Max Reservation Days: "
            onValueChange={setMaxdays}
            value={maxdays}
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
      ) : null}
      {Object.values(languages).length ? (
        <div className="flex flex-col gap-2 border-b px-4 pt-2 pb-4">
          <CheckboxGroup
            classNames={{ label: '!text-sm text-black font-semibold' }}
            label="Staff Spoken Language: "
            onValueChange={setLanguage}
            value={language}
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
      ) : null}
      {Object.values(distances).length ? (
        <div className="flex flex-col gap-2 border-b px-4 pt-2 pb-4">
          <CheckboxGroup
            classNames={{ label: '!text-sm text-black font-semibold' }}
            label="Distance from selected address: "
            onValueChange={setDistance}
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
      {Object.values(policies).length ? (
        <div className="flex flex-col gap-2 px-4 pt-2 pb-4">
          <CheckboxGroup
            classNames={{ label: '!text-sm text-black font-semibold' }}
            label="Reservation Policy: "
            onValueChange={setPolicy}
            value={policy}
          >
            {Object.entries(policies).map(([label, count]) => (
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

export default SearchStayFilterBox;
