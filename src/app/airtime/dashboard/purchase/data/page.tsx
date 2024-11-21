'use client';

import { AirtimePurchaseAmount, AirtimePurchaseReceiver } from '@/containers';
import { airtimePurchaseSchema, AirtimePurchaseType } from '@/schemas';
import { VTUType } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

const AirtimePurchaseDataPage = () => {
  const [page, setPage] = useState<string>('main');
  const methods = useForm<AirtimePurchaseType>({
    mode: 'onChange',
    resolver: zodResolver(airtimePurchaseSchema),
  });

  useEffect(() => {
    methods.setValue('type', VTUType.DATA);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <FormProvider {...methods}>
      {page === 'main' ? <AirtimePurchaseReceiver type={VTUType.DATA} goNext={() => setPage('amount')} /> : null}
      {page === 'amount' ? <AirtimePurchaseAmount type={VTUType.DATA} goBack={() => setPage('main')} /> : null}
    </FormProvider>
  );
};

export default AirtimePurchaseDataPage;
