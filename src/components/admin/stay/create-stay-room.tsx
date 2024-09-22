'use client';

import { IFurniture, IRoom } from '@/types';
import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { IoIosRemoveCircle } from 'react-icons/io';
import { IoAdd, IoRemoveCircleOutline } from 'react-icons/io5';

interface ICreateStayRoom {
  room: IRoom;
  setBed: (room: string, bed: IFurniture, isDeleting?: boolean) => void;
  removeRoom: (name: string) => void;
}

const CreateStayRoomCard = ({ room: { name, furnitures }, setBed, removeRoom }: ICreateStayRoom) => {
  const [bedType, setBedType] = useState<string>('');
  const [bedCount, setBedCount] = useState<number>(0);

  const addRoomBed = () => {
    if (!bedType.trim()) return toast.error('Furniture type cannot be empty');
    if (bedType.length < 3) return toast.error('Furniture type should be atleast 3 characters');
    if (!bedCount) return toast.error('Furniture count should be atleast 1');
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
          onPress={() => removeRoom(name)}
        >
          <IoIosRemoveCircle className="text-lg" />
        </Button>
      </div>
      <div className="flex flex-col gap-2 h-full">
        <div className="flex-1 flex flex-col">
          {furnitures.map((furniture) => (
            <div key={furniture.type} className="flex items-center justify-between gap-4">
              <p className="text-xs font-light">
                {furniture.count}x {furniture.type}
              </p>
              <Button
                aria-label="Add Amenity"
                isIconOnly
                radius="sm"
                size="sm"
                variant="light"
                color="danger"
                onPress={() => setBed(name, furniture, true)}
              >
                <IoRemoveCircleOutline className="text-lg" />
              </Button>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-3 gap-1">
            <Input
              name="furniture type"
              label="Furniture type"
              labelPlacement="inside"
              placeholder=" "
              size="sm"
              value={bedType}
              isRequired
              onValueChange={setBedType}
              className="text-accentGray col-span-2"
            />
            <Select
              selectedKeys={[bedCount]}
              onChange={(e) => setBedCount(+e.target.value)}
              isRequired
              size="sm"
              label="Count"
              placeholder=" "
              className="col-span-1"
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
            onPress={addRoomBed}
          >
            Add Furniture
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateStayRoomCard;
