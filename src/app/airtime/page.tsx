import { Destinations, DiscoverHome, Footer, HomeHeader, StaySearchBar } from '@/containers';
import React from 'react';

const AirtimePage = () => {
  return (
    <>
      <HomeHeader />
      <main className="flex flex-col gap-14 bg-white">
        <div className="container mx-auto px-10 flex flex-col gap-10 max-w-7xl">
          <StaySearchBar extraClass="-mt-9" isMain />
        </div>
        <DiscoverHome />
        <div className="container mx-auto px-10 flex flex-col gap-10 max-w-7xl">
          <Destinations />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AirtimePage;
