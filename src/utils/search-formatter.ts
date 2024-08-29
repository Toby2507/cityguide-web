import { IStay } from '@/types';

interface IFilter {
  [key: string]: number;
}

export const stayTypeFormat = (stays: IStay[]): IFilter => {
  return stays.reduce((types: IFilter, stay) => {
    types[stay.type] = (types[stay.type] || 0) + 1;
    return types;
  }, {});
};

export const getMaxPrice = (stays: IStay[]): number => {
  let maxPrice = -Infinity;
  for (const stay of stays) for (const acc of stay.accommodation) if (maxPrice < acc.price) maxPrice = acc.price;
  return maxPrice;
};

export const ratingsFormat = (stays: IStay[]): IFilter => {
  const rating = {
    'Exceptional: 4.5+': 0,
    'Excellent: 4+': 0,
    'Very Good: 3.5+': 0,
    'Above Average: 2.5+': 0,
    'Below Average: 1.5+': 0,
  };
  stays.forEach((stay) => {
    if (stay.rating >= 4.5) rating['Exceptional: 4.5+'] += 1;
    else if (stay.rating >= 4) rating['Excellent: 4+'] += 1;
    else if (stay.rating >= 3.5) rating['Very Good: 3.5+'] += 1;
    else if (stay.rating >= 2.5) rating['Above Average: 2.5+'] += 1;
    else if (stay.rating >= 1.5) rating['Below Average: 1.5+'] += 1;
    else return;
  });
  return rating;
};

export const maxDaysFormat = (stays: IStay[]): IFilter => {
  return stays.reduce((maxDays: IFilter, stay) => {
    maxDays[`${stay.maxDays} days`] = (maxDays[`${stay.maxDays} days`] || 0) + 1;
    return maxDays;
  }, {});
};

export const languageFormat = (stays: IStay[]): IFilter => {
  const languages: IFilter = {};
  for (const stay of stays) {
    for (const lang of stay.language) {
      const language = `${lang[0].toUpperCase()}${lang.slice(1).toLowerCase()}`;
      languages[language] = (languages[language] || 0) + 1;
    }
  }
  return languages;
};

export const distanceFormat = (stays: IStay[]): IFilter => {
  const distances = {
    'Less than 1 km': 0,
    'Less than 3 km': 0,
    'Less than 5 km': 0,
    'Less than 10 km': 0,
    'Less than 20 km': 0,
  };
  stays.forEach((stays) => {
    if ((stays.locationInfo?.distance || 21000) <= 1000) distances['Less than 1 km'] += 1;
    else if ((stays.locationInfo?.distance || 21000) <= 3000) distances['Less than 3 km'] += 1;
    else if ((stays.locationInfo?.distance || 21000) <= 5000) distances['Less than 5 km'] += 1;
    else if ((stays.locationInfo?.distance || 21000) <= 10000) distances['Less than 10 km'] += 1;
    else if ((stays.locationInfo?.distance || 21000) <= 20000) distances['Less than 20 km'] += 1;
    else return;
  });
  return distances;
};

export const getFilterData = (stays: IStay[]) => {
  return {
    stayTypes: stayTypeFormat(stays),
    maxPrice: getMaxPrice(stays),
    ratings: ratingsFormat(stays),
    maxDays: maxDaysFormat(stays),
    languages: languageFormat(stays),
    distances: distanceFormat(stays),
  };
};
