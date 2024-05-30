'use client';

import {
  Button,
  DateRangePicker,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from '@nextui-org/react';
import { MdOutlineLocationSearching } from 'react-icons/md';

const StaySearchBar = () => {
  return (
    <>
      <Input
        className="flex-1 h-full"
        placeholder="Set destination"
        startContent={<MdOutlineLocationSearching />}
        size="lg"
        radius="sm"
      />
      <DateRangePicker className="flex-1" label="Set check in/check out date" radius="sm" visibleMonths={2} />
      <Dropdown className="flex-1" radius="sm">
        <DropdownTrigger>
          <Button className="bg-white" radius="sm" variant="solid" size="lg">
            Hello World
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem key="new">New file</DropdownItem>
          <DropdownItem key="copy">Copy link</DropdownItem>
          <DropdownItem key="edit">Edit file</DropdownItem>
          <DropdownItem key="delete" className="text-danger" color="danger">
            Delete file
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Button size="lg" color="primary" radius="sm">
        Search
      </Button>
    </>
  );
};

export default StaySearchBar;
