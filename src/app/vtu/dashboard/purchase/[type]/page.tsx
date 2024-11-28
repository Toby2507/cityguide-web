'use client';

import { VtuPurchaseAmount, VtuPurchasePayment, VtuPurchaseReceiver } from '@/containers';
import { vtuPurchaseSchema, VtuPurchaseType } from '@/schemas';
import { VTUType } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

interface Props {
  params: {
    type: string;
  };
}

const VtuPurchasePage = ({ params: { type } }: Props) => {
  let vtuType: VTUType;
  if (type === 'airtime') vtuType = VTUType.AIRTIME;
  else if (type === 'data') vtuType = VTUType.DATA;
  else notFound();
  const [page, setPage] = useState<string>('main');
  const methods = useForm<VtuPurchaseType>({
    mode: 'onChange',
    resolver: zodResolver(vtuPurchaseSchema),
  });

  useEffect(() => {
    methods.setValue('type', vtuType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <FormProvider {...methods}>
      {page === 'main' ? <VtuPurchaseReceiver type={vtuType} goNext={() => setPage('amount')} /> : null}
      {page === 'amount' ? (
        <VtuPurchaseAmount type={vtuType} goBack={() => setPage('main')} goNext={() => setPage('payment')} />
      ) : null}
      {page === 'payment' ? <VtuPurchasePayment type={vtuType} goBack={() => setPage('amount')} /> : null}
    </FormProvider>
  );
};

export default VtuPurchasePage;
