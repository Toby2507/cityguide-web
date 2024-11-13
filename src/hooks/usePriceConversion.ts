'use client';

import { useGeneralStore } from '@/providers';
import { numberToCurrency } from '@/utils';

const usePriceConversion = () => {
  const { currency, exchangeRates } = useGeneralStore();

  const convertPrice = (price: number, currencyCode: string) => {
    if (currency?.code === '€$£' || !exchangeRates) return numberToCurrency(price, currencyCode);
    const rate = exchangeRates[currencyCode];
    return numberToCurrency(price / rate, currency?.code);
  };

  return { convertPrice };
};

export default usePriceConversion;
