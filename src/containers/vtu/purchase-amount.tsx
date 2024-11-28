'use client';

import { usePriceConversion } from '@/hooks';
import { VtuPurchaseType } from '@/schemas';
import { getVTUServices } from '@/server';
import { IVtuService, VTUType } from '@/types';
import { numberToCurrency } from '@/utils';
import { Button, Checkbox } from '@nextui-org/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';
import { IoIosArrowRoundBack } from 'react-icons/io';

interface Props {
  type: VTUType;
  goBack: () => void;
  goNext: () => void;
}

const AirtimePurchaseAmount = ({ type, goBack, goNext }: Props) => {
  const { convertPrice } = usePriceConversion();
  const { setValue, resetField, trigger, watch } = useFormContext<VtuPurchaseType>();
  const [selectedService, setSelectedService] = useState<string>('');
  const isp = watch('network');
  const { data: services } = useSuspenseQuery({
    queryKey: ['vtu-services', { type, isp }],
    queryFn: async () => getVTUServices(type, isp),
  });

  const selectService = ({ id, amount, value }: IVtuService) => {
    if (selectedService && selectedService === id) {
      setSelectedService('');
      resetField('serviceId');
      resetField('amount');
      resetField('dataValue');
    } else {
      setSelectedService(id);
      setValue('serviceId', id);
      setValue('amount', amount);
      if (type === VTUType.DATA) setValue('dataValue', value);
    }
  };
  const handleContinue = async () => {
    const isValid = await trigger(['serviceId', 'amount']);
    if (!isValid) return toast.error('Please select a service to purchase');
    goNext();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-6">
        <Button
          startContent={<IoIosArrowRoundBack />}
          size="sm"
          variant="light"
          color="primary"
          className="w-fit pl-4 pr-6"
          onClick={goBack}
        >
          Back
        </Button>
        <h1 className="text-xl font-semibold">Top up amount</h1>
      </div>
      <div className="grid grid-cols-3 gap-x-4 gap-y-8">
        {services.map((service) => {
          return (
            <Checkbox
              classNames={{ base: 'max-w-full', label: 'w-full' }}
              className="bg-gray150 p-3 rounded-xl"
              isSelected={selectedService === service.id}
              onValueChange={() => selectService(service)}
              key={service.value}
            >
              <div className="flex flex-col pl-2">
                <div className="flex items-center justify-between gap-4 w-full">
                  <p className="text-sm font-medium">{numberToCurrency(service.amount)}</p>
                  <p className="text-sm font-medium">{service.value}</p>
                </div>
                <p className="text-xs text-accentGray font-medium">You pay: {convertPrice(service.amount, 'NGN')}</p>
              </div>
            </Checkbox>
          );
        })}
      </div>
      <Button
        onPress={handleContinue}
        className="bg-gradient-linear text-white text-base font-semibold px-20 py-6 mt-2 w-full"
        radius="full"
      >
        Continue
      </Button>
    </div>
  );
};

export default AirtimePurchaseAmount;
