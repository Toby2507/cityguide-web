import { CiParking1 } from 'react-icons/ci';
import { IoLocationOutline } from 'react-icons/io5';

const StayDetailInfo = () => {
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <p className="col-span-3">
        Offering an outdoor swimming pool, PURPLE HIBISCUS HOMES features accommodations in Lagos. This property offers
        access to a balcony, free private parking, and free Wifi. The property is 0.7 miles from the city center and 1.9
        miles from Landmark Beach.
        <br />
        <br />
        Featuring a terrace and sea views, the spacious apartment includes 3 bedrooms, 2 living rooms, flat-screen TV,
        an equipped kitchen, and 3 bathrooms with a bidet and a bath. Towels and bed linen are available in the
        apartment. This apartment is non-smoking and soundproof.
        <br />
        <br />A mini-market is available at the apartment.
        <br />
        <br />
        Ikoyi Golf Course is 1.5 miles from the apartment, while Red Door Gallery is 1.7 miles from the property. The
        nearest airport is Murtala Muhammed International Airport, 14 miles from PURPLE HIBISCUS HOMES.
      </p>
      <aside className="flex flex-col gap-2 h-full">
        <div className="flex items-center border rounded-lg">
          <div className="flex flex-col p-2">
            <h6 className="text-xs">Establishment</h6>
            <p className="text-sm font-semibold capitalize">Eko Real Estate</p>
          </div>
        </div>
        <div className="flex flex-col bg-secondary/50 gap-2 rounded-lg p-3 h-full">
          <h4 className="text-lg font-semibold">Property Highlight</h4>
          <p className="flex gap-1 text-xs">
            <IoLocationOutline size={20} />
            <span>Top location: Highly rated by recent guests (8.9)</span>
          </p>
          <p className="flex items-center gap-1 text-xs">
            <CiParking1 size={20} />
            <span>Free Parking Available On Site</span>
          </p>
        </div>
      </aside>
    </div>
  );
};

export default StayDetailInfo;
