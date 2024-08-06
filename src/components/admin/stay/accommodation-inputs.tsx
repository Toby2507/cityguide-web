'use client';

import { createStaySchema } from '@/schemas';
import { IBed, ICreateStay, IRoom, Parking } from '@/types';
import { onEnter } from '@/utils';
import { Input, Select, SelectItem, Textarea } from '@nextui-org/react';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { Controller, useController, useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';
import CreateStayAmenities from './create-stay-amenities';
import CreateStayRoomCard from './create-stay-room';

interface IAccommodationInputs {
  idx: number;
}

const AccommodationInputs = ({ idx }: IAccommodationInputs) => {
  const { control, watch, setFocus, setValue } = useFormContext<ICreateStay>();
  const [roomName, setRoomName] = useState<string>('');
  const {
    field: { onChange, ref, value = [] },
    fieldState: { error },
  } = useController({
    control,
    name: `accommodation.${idx}.rooms`,
    rules: {
      validate: (val) => {
        const isValid = createStaySchema.shape.accommodation.element.shape.rooms.safeParse(val);
        return isValid.success || isValid.error.flatten().formErrors.join(', ');
      },
    },
  });
  const {
    field: { onChange: addAmenities, value: amenities = [] },
  } = useController({ control, name: `accommodation.${idx}.amenities` });

  const addRoom = () => {
    if (!roomName) return;
    if (roomName.length < 3) return toast.error('Room name must be at least 3 characters');
    if (value?.find((v: IRoom) => v.name === roomName)) return toast.error('Room name already exists');
    onChange([...value, { name: roomName, beds: [] }]);
    setRoomName('');
  };
  const removeRoom = (name: string) => {
    onChange(value.filter((v: IRoom) => v.name !== name));
  };
  const setBed = (room: string, bed: IBed, isDeleting = false) => {
    const updated = value.map((v: IRoom) =>
      v.name === room
        ? { ...v, beds: [...v.beds.filter((b: IBed) => b.type !== bed.type), ...(isDeleting ? [] : [bed])] }
        : v
    );
    onChange(updated);
  };
  const addAmenity = (amenity: string) => {
    let newAmenities = [...amenities];
    if (newAmenities?.includes(amenity)) newAmenities = newAmenities.filter((a) => a !== amenity);
    else newAmenities.push(amenity);
    addAmenities(newAmenities);
  };

  const initAvail = watch(`accommodation.${idx}.initialAvailable`);
  useEffect(() => {
    if (!watch(`accommodation.${idx}.id`)) setValue(`accommodation.${idx}.id`, nanoid());
  }, [setValue, watch, idx]);
  useEffect(() => {
    if (initAvail) setValue(`accommodation.${idx}.available`, initAvail);
  }, [initAvail, idx, setValue]);
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
        rules={{
          validate: (val) => {
            const isValid = createStaySchema.shape.accommodation.element.shape.name.safeParse(val);
            return isValid.success || isValid.error.flatten().formErrors.join(', ');
          },
        }}
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
        rules={{
          validate: (val) => {
            const isValid = createStaySchema.shape.accommodation.element.shape.description.safeParse(val);
            return isValid.success || isValid.error.flatten().formErrors.join(', ');
          },
        }}
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
          rules={{
            validate: (val) => {
              const isValid = createStaySchema.shape.accommodation.element.shape.maxGuests.safeParse(val);
              return isValid.success || isValid.error.flatten().formErrors.join(', ');
            },
          }}
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
          rules={{
            validate: (val) => {
              const isValid = createStaySchema.shape.accommodation.element.shape.bathrooms.safeParse(val);
              return isValid.success || isValid.error.flatten().formErrors.join(', ');
            },
          }}
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
          rules={{
            validate: (val) => {
              const isValid = createStaySchema.shape.accommodation.element.shape.size.safeParse(val);
              return isValid.success || isValid.error.flatten().formErrors.join(', ');
            },
          }}
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
          name={`accommodation.${idx}.initialAvailable`}
          rules={{
            validate: (val) => {
              const isValid = createStaySchema.shape.accommodation.element.shape.initialAvailable.safeParse(val);
              return isValid.success || isValid.error.flatten().formErrors.join(', ');
            },
          }}
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
          rules={{
            validate: (val) => {
              const isValid = createStaySchema.shape.accommodation.element.shape.children.safeParse(val);
              return isValid.success || isValid.error.flatten().formErrors.join(', ');
            },
          }}
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
          rules={{
            validate: (val) => {
              const isValid = createStaySchema.shape.accommodation.element.shape.infants.safeParse(val);
              return isValid.success || isValid.error.flatten().formErrors.join(', ');
            },
          }}
        />
        <Controller
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Select
              selectedKeys={value === undefined ? undefined : [value ? 'Yes' : 'No']}
              onChange={(e) => onChange(e.target.value === 'Yes')}
              isRequired
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
          rules={{
            validate: (val) => {
              const isValid = createStaySchema.shape.accommodation.element.shape.breakfast.safeParse(val);
              return isValid.success || isValid.error.flatten().formErrors.join(', ');
            },
          }}
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
          rules={{
            validate: (val) => {
              const isValid = createStaySchema.shape.accommodation.element.shape.parking.safeParse(val);
              return isValid.success || isValid.error.flatten().formErrors.join(', ');
            },
          }}
        />
      </div>
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
        <div className="grid grid-cols-3 gap-3">
          {value.map((room: IRoom) => (
            <CreateStayRoomCard key={room.name} room={room} setBed={setBed} removeRoom={removeRoom} />
          ))}
        </div>
      ) : null}
      <CreateStayAmenities
        amenities={amenities}
        label="Add amenities specific to this accommodation"
        setAmenities={addAmenity}
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
        rules={{
          validate: (val) => {
            const isValid = createStaySchema.shape.accommodation.element.shape.price.safeParse(val);
            return isValid.success || isValid.error.flatten().formErrors.join(', ');
          },
        }}
      />
    </>
  );
};

export default AccommodationInputs;
