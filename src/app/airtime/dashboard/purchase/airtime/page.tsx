'use client';

import { AirtimePurchaseAmount, AirtimePurchaseReceiver } from '@/containers';
import { airtimePurchaseSchema, AirtimePurchaseType } from '@/schemas';
import { AirtimePurchaseTypes } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

const AirtimePurchaseAirtimePage = () => {
  const [page, setPage] = useState<string>('main');
  const methods = useForm<AirtimePurchaseType>({
    mode: 'onChange',
    resolver: zodResolver(airtimePurchaseSchema),
  });

  useEffect(() => {
    methods.setValue('type', AirtimePurchaseTypes.VTU);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <FormProvider {...methods}>
      {page === 'main' ? (
        <AirtimePurchaseReceiver type={AirtimePurchaseTypes.VTU} goNext={() => setPage('amount')} />
      ) : null}
      {page === 'amount' ? (
        <AirtimePurchaseAmount type={AirtimePurchaseTypes.VTU} goBack={() => setPage('main')} />
      ) : null}
    </FormProvider>
  );
};

export default AirtimePurchaseAirtimePage;
