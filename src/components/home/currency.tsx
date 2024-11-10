'use client';

import { useGeneralStore } from '@/providers';
import { getCurrencies } from '@/server';
import { ICurrency } from '@/types';
import { Button, Modal, ModalBody, ModalContent, useDisclosure } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { IoCheckmark } from 'react-icons/io5';

const CurrencySelector = () => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const { currency, setCurrency, setExchangeRates } = useGeneralStore();
  const { data: currencies, isPending } = useQuery({
    queryKey: ['currencies'],
    queryFn: getCurrencies,
    staleTime: 1000 * 60 * 60 * 24,
  });
  const selectCurrency = (currency: ICurrency) => {
    setCurrency(currency);
    console.log(currency);
    onClose();
  };

  console.log({ currency });

  if (!currencies?.length || isPending) return null;
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="bottom" size="5xl" scrollBehavior="inside">
        <ModalContent className="h-[90vh]">
          {(onClose) => (
            <ModalBody>
              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-bold">Select your currency</h3>
                <p className="text-sm">
                  Where applicable, prices will be converted to and shown in the currency you select. The currency you
                  pay in may differ based on your reservation, and a service fee may also apply.
                </p>
                <div className="grid grid-cols-4 gap-4 pt-4 overflow-auto">
                  {currencies.map((curr) => {
                    const isActive = currency?.code === curr.code;
                    return (
                      <Button
                        className="py-2 h-fit"
                        key={curr.code}
                        onPress={() => selectCurrency(curr)}
                        radius="sm"
                        color={isActive ? 'secondary' : 'default'}
                        variant="light"
                        endContent={isActive ? <IoCheckmark size={24} className="text-secondary" /> : undefined}
                      >
                        <div className="flex flex-col items-start gap-1 w-full">
                          <p className={`text-sm ${isActive ? 'text-secondary' : 'text-gray-600'} font-semibold`}>
                            {curr.name}
                          </p>
                          <p className={`text-xs ${isActive ? 'text-secondary' : 'text-accentGray'}`}>{curr.code}</p>
                        </div>
                      </Button>
                    );
                  })}
                </div>
              </div>
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
      <Button onPress={onOpen} radius="sm" variant="light">
        <p className="text-sm text-white font-semibold">{currency?.code}</p>
      </Button>
    </>
  );
};

export default CurrencySelector;
