'use client';

import { getStayById } from '@/server';
import { PropertyType } from '@/types';
import { useQuery } from '@tanstack/react-query';
import DetailPageAmenities from '../common/amenities';
import DetailPageOverview from '../common/overview';
import StayDetailAvailability from './availability';
import StayDetailInfoReview from './review';
import StayDetailRules from './rules';

interface Props {
  stayId: string;
}

const StayDetailContainer = ({ stayId }: Props) => {
  const { data: stay, isPending } = useQuery({
    queryKey: ['stay', stayId],
    queryFn: async () => await getStayById(stayId),
  });

  if (!stay || isPending) return null;
  return (
    <>
      <DetailPageOverview propType={PropertyType.STAY} {...stay} />
      <DetailPageAmenities {...stay} />
      <StayDetailAvailability stay={stay} />
      <StayDetailInfoReview stay={stay} />
      <StayDetailRules stay={stay} />
    </>
  );
};

export default StayDetailContainer;
