'use client';

import { IStay } from '@/types';
import { filterStayResults, getFilterData } from '@/utils';
import { Checkbox, CheckboxGroup, Slider, SliderValue } from '@nextui-org/react';
import slice from 'lodash/slice';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';

interface Props {
  stays: IStay[] | undefined;
  types?: string[];
  filterStays: Dispatch<SetStateAction<IStay[]>>;
}

const SearchStayFilterBox = ({ stays, types, filterStays }: Props) => {
  const [paramUsed, setParamUsed] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<string[]>([]);
  const [rating, setRating] = useState<string[]>([]);
  const [maxdays, setMaxdays] = useState<string[]>([]);
  const [language, setLanguage] = useState<string[]>([]);
  const [distance, setDistance] = useState<string[]>([]);
  const [payment, setPayment] = useState<string[]>([]);
  const [policy, setPolicy] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<SliderValue>([0, 500000]);

  const {
    stayTypes,
    maxPrice: { min, max },
    ratings,
    maxDays,
    languages,
    distances,
    payments,
    policies,
  } = useMemo(() => getFilterData(stays || []), [stays]);

  const isSingle = (val: string[], cb: Dispatch<SetStateAction<string[]>>) => {
    const newVal = slice(val, -1);
    cb(newVal);
  };

  useEffect(() => {
    if (stays && types && !paramUsed) {
      setSelectedType(types);
      setParamUsed(true);
    }
  }, [stays, types, paramUsed]);
  useEffect(() => {
    if (stays)
      filterStays(
        filterStayResults(
          stays,
          selectedType,
          rating[0],
          maxdays[0],
          language,
          distance[0],
          payment,
          policy[0],
          (priceRange as number[])[0],
          (priceRange as number[])[1]
        )
      );
  }, [selectedType, rating, maxdays, language, distance, payment, policy, priceRange, stays, types, filterStays]);
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
      {Object.values(maxDays).length ? (
        <div className="flex flex-col gap-2 border-b px-4 pt-2 pb-4">
          <CheckboxGroup
            classNames={{ label: '!text-sm text-black font-semibold' }}
            label="Max Reservation Days: "
            onValueChange={(val) => isSingle(val, setMaxdays)}
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
      {Object.values(policies).length ? (
        <div className="flex flex-col gap-2 px-4 pt-2 pb-4">
          <CheckboxGroup
            classNames={{ label: '!text-sm text-black font-semibold' }}
            label="Reservation Policy: "
            onValueChange={(val) => isSingle(val, setPolicy)}
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
