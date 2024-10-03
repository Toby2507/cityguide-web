import { INightLife, IRestaurant, IStay, NightLifeType, PriceRange, StayType } from '@/types';

interface IFilter {
  [key: string]: number;
}

// Stay
// // Data
const stayTypeFormat = (stays: IStay[]): IFilter => {
  const types: IFilter = {};
  Object.values(StayType).forEach((type) => {
    types[type] = 0;
  });
  return stays.reduce((types: IFilter, stay) => {
    types[stay.type]++;
    return types;
  }, types);
};

const getMinMaxPrice = (stays: IStay[]) => {
  if (!stays.length) return { min: 0, max: 1000 };
  const flatAcc = stays.flatMap((stay) => stay.accommodation.map((acc) => acc.price));
  return { min: Math.min(...flatAcc), max: Math.max(...flatAcc) };
};

const ratingsFormat = (stays: (IStay | IRestaurant | INightLife)[]): IFilter => {
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

const maxDaysFormat = (stays: IStay[]): IFilter => {
  return stays.reduce((maxDays: IFilter, stay) => {
    maxDays[`${stay.maxDays} days`] = (maxDays[`${stay.maxDays} days`] || 0) + 1;
    return maxDays;
  }, {});
};

const languageFormat = (stays: IStay[]): IFilter => {
  const languages: IFilter = {};
  for (const stay of stays) {
    for (const lang of stay.language) {
      const language = `${lang[0].toUpperCase()}${lang.slice(1).toLowerCase()}`;
      languages[language] = (languages[language] || 0) + 1;
    }
  }
  return languages;
};

const distanceFormat = (stays: (IStay | IRestaurant | INightLife)[]): IFilter => {
  const distanceRanges = [
    { max: 1000, label: 'Less than 1 km' },
    { max: 5000, label: 'Less than 5 km' },
    { max: 10000, label: 'Less than 10 km' },
    { max: 20000, label: 'Less than 20 km' },
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

const paymentFormat = (stays: (IStay | IRestaurant | INightLife)[]): IFilter => {
  const payments: IFilter = {};
  for (const stay of stays) {
    let isCredit = true;
    for (const pay of (stay as IStay).paymentMethods ?? (stay as IRestaurant).details.paymentOptions) {
      const payment = `${pay[0].toUpperCase()}${pay.slice(1).toLowerCase()}`;
      if (payment.toLowerCase().includes('credit') || payment.toLowerCase().includes('debit')) {
        if (isCredit) payments['Credit/Debit Cards'] = (payments['Credit/Debit Cards'] || 0) + 1;
        isCredit = false;
      } else payments[payment] = (payments[payment] || 0) + 1;
    }
  }
  return payments;
};

const policyFormat = (stays: IStay[]): IFilter => {
  return stays.reduce((acc: IFilter, stay) => {
    if (!stay.cancellationPolicy) acc['Free cancellation'] = (acc['Free cancellation'] || 0) + 1;
    if (![StayType.APARTMENT, StayType.BnB].includes(stay.type)) acc['No prepayment'] = (acc['No prepayment'] || 0) + 1;
    if (stay.paymentMethods.some((p) => p.toLowerCase().includes('credit')))
      acc['Reserve without credit card'] = (acc['Reserve without credit card'] || 0) + 1;
    return acc;
  }, {});
};

export const getStayFilterData = (stays: IStay[]) => {
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
const filterByType = (stays: IStay[], filterBy: Set<string>) => {
  return stays.filter((stay) => filterBy.has(stay.type));
};

const filterByRating = (stays: (IStay | IRestaurant | INightLife)[], filterBy: string) => {
  const minRating = +filterBy.split(': ')[1].replace('+', '');
  return stays.filter((stay) => stay.rating >= minRating);
};

const filterByMaxDays = (stays: IStay[], filterBy: string) => {
  const maxDays = +filterBy.split(' ')[0];
  return stays.filter((stay) => stay.maxDays === maxDays);
};

const filterByLanguage = (stays: IStay[], filterBy: string[]) =>
  stays.filter((stay) => {
    const langs = new Set(stay.language);
    return filterBy.every((lang) => langs.has(`${lang[0].toUpperCase()}${lang.slice(1).toLowerCase()}`));
  });

const filterByDistance = (stays: (IStay | IRestaurant | INightLife)[], filterBy: string) => {
  const [op, _, d, __] = filterBy.split(' ');
  let maxDistance = Infinity;
  if (op === 'Less') maxDistance = +d * 1000;
  if (maxDistance === Infinity) return stays;
  return stays.filter((stay) => (stay.locationInfo?.distance ?? 21000) <= maxDistance);
};

const filterByPayment = (stays: (IStay | IRestaurant | INightLife)[], filterBy: string[]) => {
  return stays.filter((stay) => {
    const pays = (stay as IStay).paymentMethods ?? (stay as IRestaurant).details.paymentOptions;
    const paySet = new Set(pays.map((pay) => `${pay[0].toUpperCase()}${pay.slice(1).toLowerCase()}`));
    return filterBy.every((pay) => {
      if (
        pay === 'Credit/Debit Cards' &&
        pays.some((p) => p.toLowerCase().includes('credit') || p.toLowerCase().includes('debit'))
      )
        return true;
      return paySet.has(pay);
    });
  });
};

const filterByPolicy = (stays: IStay[], filterBy: string) => {
  return stays.filter((stay) => {
    if (filterBy === 'Free cancellation' && !stay.cancellationPolicy) return true;
    if (filterBy === 'No prepayment' && ![StayType.APARTMENT, StayType.BnB].includes(stay.type)) return true;
    if (
      filterBy === 'Reserve without credit card' &&
      stay.paymentMethods.some((p) => p.toLowerCase().includes('credit'))
    )
      return true;
    return false;
  });
};

const filterByPrice = (stays: IStay[], min: number, max: number) =>
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
  if (rating) results = filterByRating(results, rating) as IStay[];
  if (maxdays) results = filterByMaxDays(results, maxdays);
  if (language.length) results = filterByLanguage(results, language);
  if (distance) results = filterByDistance(results, distance) as IStay[];
  if (payment.length) results = filterByPayment(results, payment) as IStay[];
  if (policy) results = filterByPolicy(results, policy);
  return results;
};

// Restaurant
// // Data
const priceRangeFormat = (res: IRestaurant[]): IFilter => {
  const types: IFilter = {};
  Object.values(PriceRange).forEach((type) => {
    types[type] = 0;
  });
  return res.reduce((types: IFilter, stay) => {
    types[stay.priceRange]++;
    return types;
  }, types);
};

const getMinMaxReservePrice = (res: IRestaurant[]) => {
  if (!res.length) return { min: 0, max: 1000 };
  const flatAcc = res.map((r) => r.details.reservation?.price ?? 0);
  return { min: Math.min(...flatAcc), max: Math.max(...flatAcc) };
};

const serviceStyleFormat = (res: IRestaurant[]) => {
  const data: IFilter = {};
  for (const prop of res) {
    if (prop.serviceStyle)
      for (const style of prop.serviceStyle) {
        const item = `${style[0].toUpperCase()}${style.slice(1).toLowerCase()}`;
        data[item] = (data[item] || 0) + 1;
      }
  }
  return data;
};

const dietaryFormat = (res: IRestaurant[]) => {
  const data: IFilter = {};
  for (const prop of res) {
    if (prop.dietaryProvisions)
      for (const style of prop.dietaryProvisions) {
        const item = `${style[0].toUpperCase()}${style.slice(1).toLowerCase()}`;
        data[item] = (data[item] || 0) + 1;
      }
  }
  return data;
};

const cuisineFormat = (res: IRestaurant[]) => {
  const data: IFilter = {};
  for (const prop of res) {
    if (prop.cuisine)
      for (const style of prop.cuisine) {
        const item = `${style[0].toUpperCase()}${style.slice(1).toLowerCase()}`;
        data[item] = (data[item] || 0) + 1;
      }
  }
  return data;
};

export const getRestaurantFilterData = (res: IRestaurant[]) => {
  return {
    priceRanges: priceRangeFormat(res),
    maxPrice: getMinMaxReservePrice(res),
    ratings: ratingsFormat(res),
    serviceStyles: serviceStyleFormat(res),
    dietaries: dietaryFormat(res),
    cuisines: cuisineFormat(res),
    distances: distanceFormat(res),
    payments: paymentFormat(res),
  };
};
// // Filter
const filterByPriceRange = (res: IRestaurant[], filterBy: Set<string>) => {
  return res.filter((prop) => filterBy.has(prop.priceRange));
};

const filterByPriceRes = (res: IRestaurant[], min: number, max: number) =>
  res.filter((prop) => {
    const price = prop.details.reservation?.price ?? 0;
    return price >= min && price <= max;
  });

const filterByService = (res: IRestaurant[], filterBy: string[]) =>
  res.filter((prop) => {
    const items = new Set(prop.serviceStyle);
    return filterBy.some((item) => items.has(`${item[0].toUpperCase()}${item.slice(1).toLowerCase()}`));
  });

const filterByCuisine = (res: IRestaurant[], filterBy: string[]) =>
  res.filter((prop) => {
    const items = new Set(prop.cuisine);
    return filterBy.some((item) => items.has(`${item[0].toUpperCase()}${item.slice(1).toLowerCase()}`));
  });

const filterByDietaries = (res: IRestaurant[], filterBy: string[]) =>
  res.filter((prop) => {
    const items = new Set(prop.dietaryProvisions);
    return filterBy.some((item) => items.has(`${item[0].toUpperCase()}${item.slice(1).toLowerCase()}`));
  });

export const filterRestaurantResults = (
  res: IRestaurant[],
  priceRange: string[],
  rating: string,
  styles: string[],
  cuisines: string[],
  diets: string[],
  distance: string,
  payment: string[],
  min: number,
  max: number
) => {
  let results = [...res];
  results = filterByPriceRes(results, min, max);
  if (priceRange.length) results = filterByPriceRange(res, new Set(priceRange));
  if (rating) results = filterByRating(results, rating) as IRestaurant[];
  if (distance) results = filterByDistance(results, distance) as IRestaurant[];
  if (payment.length) results = filterByPayment(results, payment) as IRestaurant[];
  if (styles.length) results = filterByService(results, styles);
  if (cuisines.length) results = filterByCuisine(results, cuisines);
  if (diets.length) results = filterByDietaries(results, diets);
  return results;
};

// Nightlife
// // Data
const nightlifeTypeFormat = (props: INightLife[]): IFilter => {
  const types: IFilter = {};
  Object.values(NightLifeType).forEach((type) => {
    types[type] = 0;
  });
  return props.reduce((types: IFilter, nightlife) => {
    types[nightlife.type]++;
    return types;
  }, types);
};

const getMinMaxEntryFee = (props: INightLife[]) => {
  if (!props.length) return { min: 0, max: 1000 };
  const flatAcc = props.map((r) => r.details.entryFee ?? 0);
  return { min: Math.min(...flatAcc), max: Math.max(...flatAcc) };
};

const dresscodeFormat = (props: INightLife[]) => {
  const data: IFilter = {};
  for (const prop of props) {
    for (const style of prop.rules.dressCode ?? []) {
      const item = `${style[0].toUpperCase()}${style.slice(1).toLowerCase()}`;
      data[item] = (data[item] || 0) + 1;
    }
  }
  return data;
};

const musicgenreFormat = (props: INightLife[]) => {
  const data: IFilter = {};
  for (const prop of props) {
    for (const style of prop.rules.musicGenre ?? []) {
      const item = `${style[0].toUpperCase()}${style.slice(1).toLowerCase()}`;
      data[item] = (data[item] || 0) + 1;
    }
  }
  return data;
};

const parkingFormat = (props: INightLife[]) =>
  props.reduce((parkings: IFilter, prop) => {
    parkings[prop.rules.parking] = (parkings[prop.rules.parking] || 0) + 1;
    return parkings;
  }, {});

export const getNightlifeFilterData = (prop: INightLife[]) => {
  return {
    nightlifeTypes: nightlifeTypeFormat(prop),
    entryFees: getMinMaxEntryFee(prop),
    ratings: ratingsFormat(prop),
    dresscodes: dresscodeFormat(prop),
    musicgenres: musicgenreFormat(prop),
    parkings: parkingFormat(prop),
    distances: distanceFormat(prop),
    payments: paymentFormat(prop),
  };
};
// Filters
const filterByNightlifeType = (props: INightLife[], filterBy: Set<string>) => {
  return props.filter((prop) => filterBy.has(prop.type));
};

const filterByEntryFees = (props: INightLife[], min: number, max: number) =>
  props.filter((prop) => {
    const price = prop.details.entryFee ?? 0;
    return price >= min && price <= max;
  });

const filterByDresscode = (props: INightLife[], filterBy: Set<string>) =>
  props.filter((prop) => {
    if (!prop.rules.dressCode) return false;
    return prop.rules.dressCode.some((item) => filterBy.has(`${item[0].toUpperCase()}${item.slice(1).toLowerCase()}`));
  });

const filterByMusicgenre = (props: INightLife[], filterBy: Set<string>) =>
  props.filter((prop) => {
    if (!prop.rules.musicGenre) return false;
    return prop.rules.musicGenre.some((item) => filterBy.has(`${item[0].toUpperCase()}${item.slice(1).toLowerCase()}`));
  });

const filterByParking = (props: INightLife[], filterBy: string) =>
  props.filter((prop) => filterBy == prop.rules.parking);

export const filterNightlifeResult = (
  nightlife: INightLife[],
  types: string[],
  rating: string,
  dresscodes: string[],
  musicgenres: string[],
  parking: string,
  distance: string,
  payment: string[],
  min: number,
  max: number
) => {
  let results = [...nightlife];
  results = filterByEntryFees(results, min, max);
  if (types.length) results = filterByNightlifeType(results, new Set(types));
  if (rating) results = filterByRating(results, rating) as INightLife[];
  if (distance) results = filterByDistance(results, distance) as INightLife[];
  if (payment.length) results = filterByPayment(results, payment) as INightLife[];
  if (dresscodes.length) results = filterByDresscode(results, new Set(dresscodes));
  if (musicgenres.length) results = filterByMusicgenre(results, new Set(musicgenres));
  if (parking) results = filterByParking(results, parking);
  return results;
};
