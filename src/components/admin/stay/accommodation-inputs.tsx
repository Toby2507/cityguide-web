'use client';

import { StringArrayInput } from '@/components';
import { CreateStayInput } from '@/schemas';
import { IFurniture, IRoom, Parking } from '@/types';
import { onEnter } from '@/utils';
import { Input, Select, SelectItem, Textarea } from '@nextui-org/react';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { Controller, useController, useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';
import AccommodationImages from './accommodation-images';
import CreateStayRoomCard from './create-stay-room';

interface IAccommodationInputs {
  idx: number;
  isUpdate?: boolean;
}
const defaultBreakfast = {
  price: 0,
  options: [],
};

const AccommodationInputs = ({ idx, isUpdate }: IAccommodationInputs) => {
  const { control, watch, setFocus, setValue } = useFormContext<CreateStayInput>();
  const [roomName, setRoomName] = useState<string>('');
  const {
    field: { onChange, ref, value = [] },
    fieldState: { error },
  } = useController({
    control,
    name: `accommodation.${idx}.rooms`,
  });
  const {
    field: { onChange: addAmenities, value: amenities = [] },
  } = useController({ control, name: `accommodation.${idx}.amenities` });

  const addRoom = () => {
    if (!roomName) return;
    if (roomName.length < 3) return toast.error('Room name must be at least 3 characters');
    if (value?.find((v: IRoom) => v.name === roomName)) return toast.error('Room name already exists');
    onChange([...value, { name: roomName, furnitures: [] }]);
    setRoomName('');
  };
  const removeRoom = (name: string) => {
    onChange(value.filter((v: IRoom) => v.name !== name));
  };
  const setFurniture = (room: string, furniture: IFurniture, isDeleting = false) => {
    const updated = value.map((v: IRoom) =>
      v.name === room
        ? {
            ...v,
            furnitures: [
              ...v.furnitures.filter((f: IFurniture) => f.type !== furniture.type),
              ...(isDeleting ? [] : [furniture]),
            ],
          }
        : v
    );
    onChange(updated);
  };

  const initAvail = watch(`accommodation.${idx}.available`);
  useEffect(() => {
    if (!watch(`accommodation.${idx}.id`)) setValue(`accommodation.${idx}.id`, nanoid());
  }, [setValue, watch, idx]);
  useEffect(() => {
    if (initAvail && !isUpdate) setValue(`accommodation.${idx}.initialAvailable`, initAvail);
  }, [initAvail, idx, isUpdate, setValue]);
  return (
    <>
      <Controller
        control={control}
        render={({ field: { onChange, ref, value }, fieldState: { error } }) => (
          <Input
            name="accommodation_name"
            label="Accommodation Name"
            labelPlacement="outside"
            placeholder=" "
            radius="full"
            isRequired
            value={value}
            onChange={onChange}
            onKeyDown={(e) => onEnter(e, () => setFocus(`accommodation.${idx}.description`))}
            isInvalid={!!error}
            errorMessage={error?.message}
            ref={ref}
            className="text-accentGray"
          />
        )}
        name={`accommodation.${idx}.name`}
      />
      <Controller
        control={control}
        render={({ field: { onChange, ref, value }, fieldState: { error } }) => (
          <Textarea
            name="accommodation_description"
            label="Accommodation Description"
            labelPlacement="outside"
            placeholder=" "
            radius="full"
            value={value}
            onChange={onChange}
            onKeyDown={(e) => onEnter(e, () => setFocus(`accommodation.${idx}.maxGuests`))}
            isInvalid={!!error}
            errorMessage={error?.message}
            ref={ref}
            className="text-accentGray"
          />
        )}
        name={`accommodation.${idx}.description`}
      />
      <div className="grid grid-cols-4 gap-x-2 gap-y-4">
        <Controller
          control={control}
          render={({ field: { onChange, ref, value }, fieldState: { error } }) => (
            <Input
              name="maxGuests"
              label="Max No of Guests"
              placeholder=" "
              type="tel"
              isRequired
              value={value?.toString() || ''}
              onValueChange={(val) => /^\d*$/.test(val) && onChange(+val)}
              onKeyDown={(e) => onEnter(e, () => setFocus(`accommodation.${idx}.bathrooms`))}
              isInvalid={!!error}
              errorMessage={error?.message}
              ref={ref}
              className="text-accentGray"
            />
          )}
          name={`accommodation.${idx}.maxGuests`}
        />
        <Controller
          control={control}
          render={({ field: { onChange, ref, value }, fieldState: { error } }) => (
            <Input
              name="accommodation_bathrooms"
              label="No of Bathrooms"
              placeholder=" "
              type="tel"
              isRequired
              value={value?.toString() || ''}
              onValueChange={(val) => /^\d*$/.test(val) && onChange(+val)}
              onKeyDown={(e) => onEnter(e, () => setFocus(`accommodation.${idx}.size`))}
              isInvalid={!!error}
              errorMessage={error?.message}
              ref={ref}
              className="text-accentGray"
            />
          )}
          name={`accommodation.${idx}.bathrooms`}
        />
        <Controller
          control={control}
          render={({ field: { onChange, ref, value }, fieldState: { error } }) => (
            <Input
              name="size"
              label="Size (m²)"
              placeholder=" "
              type="tel"
              value={value?.toString() || ''}
              onValueChange={(val) => /^\d*$/.test(val) && onChange(+val)}
              onKeyDown={(e) => onEnter(e, () => setFocus(`accommodation.${idx}.initialAvailable`))}
              isInvalid={!!error}
              errorMessage={error?.message}
              ref={ref}
              className="text-accentGray"
            />
          )}
          name={`accommodation.${idx}.size`}
        />
        <Controller
          control={control}
          render={({ field: { onChange, ref, value }, fieldState: { error } }) => (
            <Input
              name="availabilty"
              label="Availability"
              placeholder=" "
              type="tel"
              isRequired
              value={value?.toString() || ''}
              onValueChange={(val) => /^\d*$/.test(val) && onChange(+val)}
              isInvalid={!!error}
              errorMessage={error?.message}
              ref={ref}
              className="text-accentGray"
            />
          )}
          name={`accommodation.${idx}.available`}
        />
        <Controller
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Select
              selectedKeys={value === undefined ? undefined : [value ? 'Yes' : 'No']}
              onChange={(e) => onChange(e.target.value === 'Yes')}
              isRequired
              label="Are children allowed?"
              placeholder=" "
              isInvalid={!!error}
              errorMessage={error?.message}
            >
              <SelectItem key="Yes">Yes</SelectItem>
              <SelectItem key="No">No</SelectItem>
            </Select>
          )}
          name={`accommodation.${idx}.children`}
        />
        <Controller
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Select
              selectedKeys={value === undefined ? undefined : [value ? 'Yes' : 'No']}
              onChange={(e) => onChange(e.target.value === 'Yes')}
              isRequired
              label="Are infants allowed?"
              placeholder=" "
              isInvalid={!!error}
              errorMessage={error?.message}
            >
              <SelectItem key="Yes">Yes</SelectItem>
              <SelectItem key="No">No</SelectItem>
            </Select>
          )}
          name={`accommodation.${idx}.infants`}
        />
        <Controller
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Select
              isRequired
              selectedKeys={value === undefined ? undefined : [value]}
              onChange={onChange}
              label="Parking"
              placeholder=" "
              isInvalid={!!error}
              errorMessage={error?.message}
            >
              {Object.values(Parking).map((item, i) => (
                <SelectItem key={item}>{item}</SelectItem>
              ))}
            </Select>
          )}
          name={`accommodation.${idx}.parking`}
        />
        <Controller
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Select
              selectedKeys={[!!value ? 'Yes' : 'No']}
              onChange={(e) => onChange(e.target.value === 'Yes' ? defaultBreakfast : undefined)}
              label="Is Breakfast included?"
              placeholder=" "
              isInvalid={!!error}
              errorMessage={error?.message}
            >
              <SelectItem key="Yes">Yes</SelectItem>
              <SelectItem key="No">No</SelectItem>
            </Select>
          )}
          name={`accommodation.${idx}.breakfast`}
        />
      </div>
      {!!watch(`accommodation.${idx}.breakfast`) && (
        <div className="grid grid-cols-4 items-center gap-2">
          <Controller
            control={control}
            render={({ field: { onChange, ref, value }, fieldState: { error } }) => (
              <Input
                name="breakfast_price"
                label="Breakfast price"
                placeholder=" "
                type="tel"
                isRequired
                value={value?.toString() || ''}
                onValueChange={(val) => /^\d*$/.test(val) && onChange(+val)}
                onKeyDown={(e) => onEnter(e, () => setFocus(`accommodation.${idx}.breakfast.options`))}
                isInvalid={!!error}
                errorMessage={error?.message}
                ref={ref}
                className="text-accentGray"
              />
            )}
            name={`accommodation.${idx}.breakfast.price`}
          />
          <Controller
            control={control}
            render={({ field: { onChange, ref, value }, fieldState: { error } }) => (
              <Input
                name="breakfast_options"
                label="Breakfast options (Separate with commas)"
                labelPlacement="inside"
                placeholder=" "
                isRequired
                onChange={(e) => onChange(e.target.value.split(',').filter((i) => i.trim()))}
                isInvalid={!!error}
                errorMessage={error?.message}
                ref={ref}
                className="text-accentGray col-span-3"
                defaultValue={value?.join(', ') || ''}
              />
            )}
            name={`accommodation.${idx}.breakfast.options`}
          />
        </div>
      )}
      <AccommodationImages idx={idx} />
      <Input
        name="accommodation_name"
        label="Add Room"
        labelPlacement="outside"
        placeholder=" "
        radius="full"
        isRequired
        value={roomName}
        onValueChange={setRoomName}
        onKeyDown={(e) => onEnter(e, addRoom)}
        onBlur={() => roomName.length >= 3 && addRoom()}
        isInvalid={!!error}
        errorMessage={error?.message}
        ref={ref}
        className="text-accentGray"
      />
      {value?.length ? (
        <div className="grid grid-cols-2 gap-3">
          {value.map((room: IRoom) => (
            <CreateStayRoomCard key={room.name} room={room} setBed={setFurniture} removeRoom={removeRoom} />
          ))}
        </div>
      ) : null}
      <StringArrayInput
        arr={amenities}
        label="Add amenities specific to this accommodation"
        prevState={amenities}
        setState={addAmenities}
      />
      <Controller
        control={control}
        render={({ field: { onChange, ref, value }, fieldState: { error } }) => (
          <Input
            name="price"
            label="Price per Night"
            placeholder=" "
            type="tel"
            isRequired
            value={value?.toString() || ''}
            onValueChange={(val) => /^\d*$/.test(val) && onChange(+val)}
            isInvalid={!!error}
            errorMessage={error?.message}
            ref={ref}
            className="text-accentGray"
          />
        )}
        name={`accommodation.${idx}.price`}
      />
    </>
  );
};

export default AccommodationInputs;
