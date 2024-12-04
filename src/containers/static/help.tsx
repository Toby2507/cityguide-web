'use client';

import { HelpSideBar } from '@/components';
import { helpData } from '@/data';
import { useRef } from 'react';

const HelpPageHelper = () => {
  const mainRef = useRef<HTMLElement>(null);
  return (
    <div className="flex">
      <HelpSideBar scrollElement={mainRef} />
      <main
        ref={mainRef}
        className="flex flex-col gap-14 bg-white px-10 pb-20 h-screen overflow-y-auto w-full scroll-smooth"
      >
        {helpData.map(({ Component }) => Component)}
      </main>
    </div>
  );
};

export default HelpPageHelper;
