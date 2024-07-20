'use client';

import { IBed, IRoom } from '@/types';
import { Button, Select, SelectItem } from '@nextui-org/react';
import { useState } from 'react';
import { IoIosRemoveCircle } from 'react-icons/io';
import { IoAdd, IoRemoveCircleOutline } from 'react-icons/io5';

interface ICreateStayRoom {
  room: IRoom;
  setBed: (room: string, bed: IBed, isDeleting?: boolean) => void;
  removeRoom: (name: string) => void;
}
const BEDTYPES = ['Crib', 'Single', 'Twin', 'Full', 'Queen', 'King'];

const CreateStayRoomCard = ({ room: { name, beds }, setBed, removeRoom }: ICreateStayRoom) => {
  const [bedType, setBedType] = useState<string>('');
  const [bedCount, setBedCount] = useState<number>(0);

  const addRoomBed = () => {
    setBed(name, { type: bedType, count: bedCount });
    setBedType('');
    setBedCount(0);
  };
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-accentGray p-2">
      <div className="flex items-center justify-between gap-4">
        <h4 className="text-sm font-medium">{name}</h4>
        <Button
          aria-label="Add Amenity"
          isIconOnly
          radius="sm"
          size="sm"
          variant="light"
          color="danger"
          onClick={() => removeRoom(name)}
        >
          <IoIosRemoveCircle className="text-lg" />
        </Button>
      </div>
      <div className="flex flex-col gap-2 h-full">
        <div className="flex-1 flex flex-col">
          {beds.map((bed) => (
            <div key={bed.type} className="flex items-center justify-between gap-4">
              <p className="text-xs font-light">
                {bed.count}x {bed.type} size bed
              </p>
              <Button
                aria-label="Add Amenity"
                isIconOnly
                radius="sm"
                size="sm"
                variant="light"
                color="danger"
                onClick={() => setBed(name, bed, true)}
              >
                <IoRemoveCircleOutline className="text-lg" />
              </Button>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-5 gap-1">
            <Select
              selectedKeys={[bedType]}
              onChange={(e) => setBedType(e.target.value)}
              isRequired
              size="sm"
              label="Bed Type"
              placeholder=" "
              className="col-span-3"
            >
              {BEDTYPES.map((type) => (
                <SelectItem key={type}>{type}</SelectItem>
              ))}
            </Select>
            <Select
              selectedKeys={[bedCount]}
              onChange={(e) => setBedCount(+e.target.value)}
              isRequired
              size="sm"
              label="Count"
              placeholder=" "
              className="col-span-2"
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map((type) => (
                <SelectItem key={type}>{type.toString()}</SelectItem>
              ))}
            </Select>
          </div>
          <Button
            radius="sm"
            size="sm"
            variant="flat"
            color="primary"
            endContent={<IoAdd className="text-lg" />}
            className="font-base"
            onClick={addRoomBed}
          >
            Add Bed
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateStayRoomCard;
