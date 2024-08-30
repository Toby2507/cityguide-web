import { IPartner, IStay, StayType } from '@/types';

interface IFilter {
  [key: string]: number;
}

// Stay
// // Data
export const stayTypeFormat = (stays: IStay[]): IFilter => {
  return stays.reduce((types: IFilter, stay) => {
    types[stay.type] = (types[stay.type] || 0) + 1;
    return types;
  }, {});
};

export const getMinMaxPrice = (stays: IStay[]) => {
  if (!stays.length) return { min: 0, max: 1000 };
  const flatAcc = stays.flatMap((stay) => stay.accommodation.map((acc) => acc.price));
  return { min: Math.min(...flatAcc), max: Math.max(...flatAcc) };
};

export const ratingsFormat = (stays: IStay[]): IFilter => {
  const ratingRange = [
    { min: 4.5, label: 'Exceptional: 4.5+' },
    { min: 4, label: 'Excellent: 4+' },
    { min: 3.5, label: 'Very Good: 3.5+' },
    { min: 2.5, label: 'Above Average: 2.5+' },
    { min: 1.5, label: 'Below Average: 1.5+' },
  ];
  return stays.reduce((acc: IFilter, stay) => {
    const range = ratingRange.find((r) => stay.rating >= r.min);
    if (range) acc[range.label] = (acc[range.label] || 0) + 1;
    return acc;
  }, {});
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
  const distanceRanges = [
    { max: 1000, label: 'Less than 1 km' },
    { max: 5000, label: 'Less than 5 km' },
    { max: 10000, label: 'Less than 10 km' },
    { max: 15000, label: 'Less than 20 km' },
    { max: Infinity, label: 'More than 20 km' },
  ];
  return stays.reduce((acc: IFilter, stay) => {
    const distance = stay.locationInfo?.distance || 21000;
    distanceRanges.forEach((range) => {
      if (distance <= range.max) acc[range.label] = (acc[range.label] || 0) + 1;
    });
    return acc;
  }, {});
};

export const paymentFormat = (stays: IStay[]): IFilter => {
  const payments: IFilter = {
    'Credit/Debit Cards': 0,
  };
  for (const stay of stays) {
    for (const pay of stay.paymentMethods) {
      const payment = `${pay[0].toUpperCase()}${pay.slice(1).toLowerCase()}`;
      if (payment.toLowerCase().includes('credit') || payment.toLowerCase().includes('debit'))
        payments['Credit/Debit Cards'] += 1;
      else payments[payment] = (payments[payment] || 0) + 1;
    }
  }
  return payments;
};

export const policyFormat = (stays: IStay[]): IFilter => {
  return stays.reduce((acc: IFilter, stay) => {
    if (!(stay.partner as IPartner).cancellationPolicy) acc['Free cancellation'] = (acc['Free cancellation'] || 0) + 1;
    if (![StayType.APARTMENT, StayType.BnB].includes(stay.type)) acc['No prepayment'] = (acc['No prepayment'] || 0) + 1;
    if (stay.paymentMethods.some((p) => p.toLowerCase().includes('credit')))
      acc['Reserve without credit card'] = (acc['Reserve without credit card'] || 0) + 1;
    return acc;
  }, {});
};

export const getFilterData = (stays: IStay[]) => {
  return {
    stayTypes: stayTypeFormat(stays),
    maxPrice: getMinMaxPrice(stays),
    ratings: ratingsFormat(stays),
    maxDays: maxDaysFormat(stays),
    languages: languageFormat(stays),
    distances: distanceFormat(stays),
    payments: paymentFormat(stays),
    policies: policyFormat(stays),
  };
};
// // Filters
export const filterByType = (stays: IStay[], filterBy: Set<string>) => {
  return stays.filter((stay) => filterBy.has(stay.type));
};

export const filterByRating = (stays: IStay[], filterBy: string) => {
  const minRating = +filterBy.split(': ')[1].replace('+', '');
  return stays.filter((stay) => stay.rating >= minRating);
};

export const filterByMaxDays = (stays: IStay[], filterBy: string) => {
  const maxDays = +filterBy.split(' ')[0];
  return stays.filter((stay) => stay.maxDays === maxDays);
};

export const filterByLanguage = (stays: IStay[], filterBy: string[]) =>
  stays.filter((stay) => {
    const langs = new Set(stay.language);
    return filterBy.every((lang) => langs.has(`${lang[0].toUpperCase()}${lang.slice(1).toLowerCase()}`));
  });

export const filterByDistance = (stays: IStay[], filterBy: string): IStay[] => {
  const [op, _, d, __] = filterBy.split(' ');
  let maxDistance = Infinity;
  if (op === 'Less') maxDistance = +d * 1000;
  if (maxDistance === Infinity) return stays;
  return stays.filter((stay) => (stay.locationInfo?.distance ?? 21000) <= maxDistance);
};

export const filterByPayment = (stays: IStay[], filterBy: string[]) => {
  return stays.filter((stay) => {
    const paySet = new Set(stay.paymentMethods.map((pay) => `${pay[0].toUpperCase()}${pay.slice(1).toLowerCase()}`));
    return filterBy.every((pay) => {
      if (
        pay === 'Credit/Debit Cards' &&
        stay.paymentMethods.some((p) => p.toLowerCase().includes('credit') || p.toLowerCase().includes('debit'))
      )
        return true;
      return paySet.has(pay);
    });
  });
};

export const filterByPolicy = (stays: IStay[], filterBy: string) => {
  return stays.filter((stay) => {
    if (filterBy === 'Free cancellation' && !(stay.partner as IPartner).cancellationPolicy) return true;
    if (filterBy === 'No prepayment' && ![StayType.APARTMENT, StayType.BnB].includes(stay.type)) return true;
    if (
      filterBy === 'Reserve without credit card' &&
      stay.paymentMethods.some((p) => p.toLowerCase().includes('credit'))
    )
      return true;
    return false;
  });
};

export const filterByPrice = (stays: IStay[], min: number, max: number) =>
  stays.filter((stay) => stay.accommodation.some((acc) => acc.price >= min && acc.price <= max));

export const filterStayResults = (
  stays: IStay[],
  type: string[],
  rating: string,
  maxdays: string,
  language: string[],
  distance: string,
  payment: string[],
  policy: string,
  min: number,
  max: number
) => {
  let results = [...stays];
  results = filterByPrice(results, min, max);
  if (type.length) results = filterByType(results, new Set(type));
  if (rating) results = filterByRating(results, rating);
  if (maxdays) results = filterByMaxDays(results, maxdays);
  if (language.length) results = filterByLanguage(results, language);
  if (distance) results = filterByDistance(results, distance);
  if (payment.length) results = filterByPayment(results, payment);
  if (policy) results = filterByPolicy(results, policy);
  return results;
};
