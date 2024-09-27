import { OfferCard, SectionHeader } from '@/components';
import { offers } from '@/data';
import { Spacer } from '@nextui-org/react';

const TopOffers = () => {
  return (
    <section className="flex flex-col gap-4">
      <SectionHeader title="Top Offers" desc="Promotions, deals, and special offers for you" />
      <div className="grid grid-cols-2 gap-6 px-2">
        {offers.map((offer) => (
          <OfferCard key={offer.id} {...offer} />
        ))}
      </div>
    </section>
  );
};

export default TopOffers;
