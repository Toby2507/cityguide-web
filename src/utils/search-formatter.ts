import { IPartner, IStay, StayType } from '@/types';

interface IFilter {
  [key: string]: number;
}

export const stayTypeFormat = (stays: IStay[]): IFilter => {
  return stays.reduce((types: IFilter, stay) => {
    types[stay.type] = (types[stay.type] || 0) + 1;
    return types;
  }, {});
};

export const getMaxPrice = (stays: IStay[]): number =>
  Math.max(...stays.flatMap((stay) => stay.accommodation.map((acc) => acc.price)));

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
      if (payment.includes('Credit') || payment.includes('Debit')) payments['Credit/Debit Cards'] += 1;
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
    maxPrice: getMaxPrice(stays),
    ratings: ratingsFormat(stays),
    maxDays: maxDaysFormat(stays),
    languages: languageFormat(stays),
    distances: distanceFormat(stays),
    payments: paymentFormat(stays),
    policies: policyFormat(stays),
  };
};
