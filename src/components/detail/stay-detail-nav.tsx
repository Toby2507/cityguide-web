import { Button, ButtonGroup } from '@nextui-org/react';
import Link from 'next/link';

const StayDetailNav = () => {
  return (
    <ButtonGroup as="nav" className="w-full">
      <Button className="flex-1 border-b border-primary" variant="light" radius="none">
        <Link href="#overview">Overview</Link>
      </Button>
      <Button className="flex-1 border-b border-default" variant="light" radius="none">
        <Link href="#amenities">Amenities</Link>
      </Button>
      <Button className="flex-1 border-b border-default" variant="light" radius="none">
        <Link href="#availability">Apartment Info & Price</Link>
      </Button>
      <Button className="flex-1 border-b border-default" variant="light" radius="none">
        <Link href="#rules">House Rules</Link>
      </Button>
      <Button className="flex-1 border-b border-default" variant="light" radius="none">
        <Link href="#reviews">Review</Link>
      </Button>
    </ButtonGroup>
  );
};

export default StayDetailNav;
