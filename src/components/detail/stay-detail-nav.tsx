'use client';

import { StaySearchBar } from '@/containers';
import { Button, ButtonGroup } from '@nextui-org/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

const StayDetailNav = () => {
  const { push } = useRouter();
  return (
    <>
      <StaySearchBar extraClass="-mt-7" noLocation search={() => push('#availability')} />
      <ButtonGroup as="nav" className="w-full">
        <Button className="flex-1 border-b border-primary" variant="light" radius="none">
          <Link href="#overview">Overview</Link>
        </Button>
        <Button className="flex-1 border-b border-default" variant="light" radius="none">
          <Link href="#amenities">Amenities</Link>
        </Button>
        <Button className="flex-1 border-b border-default" variant="light" radius="none">
          <Link href="#availability">Availability</Link>
        </Button>
        <Button className="flex-1 border-b border-default" variant="light" radius="none">
          <Link href="#inforeview">Info & Review</Link>
        </Button>
        <Button className="flex-1 border-b border-default" variant="light" radius="none">
          <Link href="#rules">House Rules</Link>
        </Button>
        <Button className="flex-1 border-b border-default" variant="light" radius="none">
          <Link href="#reviews">Review</Link>
        </Button>
      </ButtonGroup>
    </>
  );
};

export default StayDetailNav;
