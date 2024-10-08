'use client';

import { NightlifeSearchBar } from '@/containers';
import { Button, ButtonGroup } from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';

const NightlifeDetailNav = () => {
  return (
    <>
      <NightlifeSearchBar extraClass="-mt-7" noLocation search={() => {}} />
      <ButtonGroup as="nav" className="w-full">
        <Button className="flex-1 border-b border-primary" variant="light" radius="none">
          <Link href="#overview">Overview</Link>
        </Button>
        <Button className="flex-1 border-b border-default" variant="light" radius="none">
          <Link href="#amenities">Amenities</Link>
        </Button>
        <Button className="flex-1 border-b border-default" variant="light" radius="none">
          <Link href="#info">Info & Review</Link>
        </Button>
      </ButtonGroup>
    </>
  );
};

export default NightlifeDetailNav;
