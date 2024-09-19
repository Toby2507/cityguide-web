'use client';

import { getNightlifeById } from '@/server';
import { PropertyType } from '@/types';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import DetailPageAmenities from '../common/amenities';
import DetailPageOverview from '../common/overview';
import NightlifeDetailInfo from './info';

interface Props {
  nightlifeId: string;
}

const NightlifeDetailContainer = ({ nightlifeId }: Props) => {
  const {
    data: nightlife,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['nightlife', nightlifeId],
    queryFn: async () => await getNightlifeById(nightlifeId),
  });

  if (isPending) return null;
  if (isError) return toast.error(error.message);
  return (
    <>
      <DetailPageOverview amenities={nightlife.details.amenities} propType={PropertyType.NIGHTLIFE} {...nightlife} />
      <DetailPageAmenities amenities={nightlife.details.amenities} {...nightlife} />
      <NightlifeDetailInfo nightlife={nightlife} />
    </>
  );
};

export default NightlifeDetailContainer;
