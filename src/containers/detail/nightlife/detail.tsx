'use client';

import { getNightlifeById } from '@/server';
import { PropertyType } from '@/types';
import { useQuery } from '@tanstack/react-query';
import DetailPageAmenities from '../common/amenities';
import DetailPageOverview from '../common/overview';
import NightlifeDetailInfo from './info';

interface Props {
  nightlifeId: string;
}

const NightlifeDetailContainer = ({ nightlifeId }: Props) => {
  const { data: nightlife, isPending } = useQuery({
    queryKey: ['nightlife', nightlifeId],
    queryFn: async () => await getNightlifeById(nightlifeId),
  });

  if (!nightlife || isPending) return null;
  return (
    <>
      <DetailPageOverview amenities={nightlife.details.amenities} propType={PropertyType.NIGHTLIFE} {...nightlife} />
      <DetailPageAmenities amenities={nightlife.details.amenities} {...nightlife} />
      <NightlifeDetailInfo nightlife={nightlife} />
    </>
  );
};

export default NightlifeDetailContainer;
