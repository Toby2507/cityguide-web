'use client';

import { VtuPurchaseType } from '@/schemas';
import { VTUType } from '@/types';
import { useRouter } from 'next/navigation';
import { useFormContext } from 'react-hook-form';

interface Props {
  type: VTUType;
  goBack: () => void;
}

const VtuPurchasePayment = ({ type, goBack }: Props) => {
  const { push } = useRouter();
  const { handleSubmit } = useFormContext<VtuPurchaseType>();
  return <div>VtuPurchasePayment</div>;
};

export default VtuPurchasePayment;
