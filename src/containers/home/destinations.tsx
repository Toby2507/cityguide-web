'use client';

import { SectionHeader } from '@/components';
import { cities, regions } from '@/data';
import { Tab, Tabs } from '@nextui-org/react';
import React from 'react';

const Destinations = () => {
  return (
    <section className="flex flex-col gap-4">
      <SectionHeader
        title="Destinations we love"
        desc="Find Your Perfect Match: Millions of Properties in Top Destinations"
      />
      <Tabs aria-label="location categories" color="primary" radius="full" variant="light">
        <Tab key="cities" title="Cities">
          <div className="grid grid-cols-4 gap-2">
            {cities.map(({ name, properties }, idx) => (
              <div key={idx} className="flex flex-col">
                <h4 className="font-semibold">{name}</h4>
                <p className="text-xs">{properties} properties</p>
              </div>
            ))}
          </div>
        </Tab>
        <Tab key="regions" title="Regions">
          <div className="grid grid-cols-8 gap-2">
            {regions.map(({ name, properties }, idx) => (
              <div key={idx} className="flex flex-col">
                <h4 className="font-semibold">{name}</h4>
                <p className="text-xs">{properties} properties</p>
              </div>
            ))}
          </div>
        </Tab>
      </Tabs>
    </section>
  );
};

export default Destinations;
