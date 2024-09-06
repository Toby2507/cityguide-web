'use client';

import { StringArrayInput } from '@/components';
import { useCustomImageSelect } from '@/hooks';
import { createRestaurantSchema } from '@/schemas';
import { uploadImages } from '@/server';
import { ICreateRestaurant } from '@/types';
import { formatFileSize, onEnter } from '@/utils';
import { Button, Image, Input, Textarea } from '@nextui-org/react';
import { nanoid } from 'nanoid';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { Controller, useController, useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';
import { IoClose } from 'react-icons/io5';

interface Props {
  idx: number;
  isUploading: boolean;
  setIsUploading: Dispatch<SetStateAction<boolean>>;
}

const MenuInputs = ({ idx, isUploading, setIsUploading }: Props) => {
  const { control, setFocus, setValue, watch } = useFormContext<ICreateRestaurant>();
  const { getRootProps, getInputProps, removeFile, clearImages, images, invalidImages } = useCustomImageSelect(
    '',
    [],
    true,
    false,
    false
  );
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    control,
    name: `menu.${idx}.imgUrl`,
    rules: {
      validate: (val) => {
        const isValid = createRestaurantSchema.shape.menu.element.shape.imgUrl.safeParse(val);
        return isValid.success || isValid.error.flatten().formErrors.join(', ');
      },
    },
  });
  const {
    field: { onChange: setDietary, value: dietary },
  } = useController({ control, name: `menu.${idx}.dietaryProvisions` });
  const {
    field: { onChange: setCategory, value: category },
  } = useController({ control, name: `menu.${idx}.category` });

  const uploadImage = async () => {
    setIsUploading(true);
    try {
      if (!images.length) return toast.error('Please select an image to be uploaded');
      const imageData = new FormData();
      imageData.append('images', images[0].file);
      try {
        const imgUrl = await uploadImages(imageData);
        onChange(imgUrl[0]);
        clearImages();
      } catch (err: any) {
        toast.error(err.message);
      }
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    if (!watch(`menu.${idx}.id`)) setValue(`menu.${idx}.id`, nanoid());
  }, [idx, setValue, watch]);
  return (
    <>
      <Controller
        control={control}
        render={({ field: { onChange, ref, value }, fieldState: { error } }) => (
          <Input
            name="item_name"
            label="Menu Item Name"
            labelPlacement="outside"
            placeholder=" "
            radius="full"
            isRequired
            value={value}
            onChange={onChange}
            onKeyDown={(e) => onEnter(e, () => setFocus(`menu.${idx}.description`))}
            isInvalid={!!error}
            errorMessage={error?.message}
            ref={ref}
            className="text-accentGray"
          />
        )}
        name={`menu.${idx}.name`}
        rules={{
          validate: (val) => {
            const isValid = createRestaurantSchema.shape.menu.element.shape.name.safeParse(val);
            return isValid.success || isValid.error.flatten().formErrors.join(', ');
          },
        }}
      />
      <Controller
        control={control}
        render={({ field: { onChange, ref, value }, fieldState: { error } }) => (
          <Textarea
            name="item_description"
            label="Menu Item Description"
            labelPlacement="outside"
            placeholder=" "
            radius="full"
            isRequired
            value={value}
            onChange={onChange}
            onKeyDown={(e) => onEnter(e, () => setFocus(`menu.${idx}.price`))}
            isInvalid={!!error}
            errorMessage={error?.message}
            ref={ref}
            className="text-accentGray"
          />
        )}
        name={`menu.${idx}.description`}
        rules={{
          validate: (val) => {
            const isValid = createRestaurantSchema.shape.menu.element.shape.description.safeParse(val);
            return isValid.success || isValid.error.flatten().formErrors.join(', ');
          },
        }}
      />
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-1">
          <p className="text-xs text-accentGray font-semibold">Menu item image</p>
          <div className="flex items-center gap-2">
            {images.length ? (
              <div
                className={`flex-1 flex items-center gap-2 px-2 py-1 rounded-xl cursor-pointer ${
                  invalidImages.includes(images[0].id) ? 'bg-red-50' : 'bg-bgAccentBlue'
                }`}
              >
                <div className="grid place-items-center h-10 object-cover w-10">
                  <Image
                    src={URL.createObjectURL(images[0].file)}
                    alt={images[0].file.name}
                    className="w-10 h-10 object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col">
                  <p className="text-sm font-medium">{images[0].file.name}</p>
                  <p className="text-xs text-accentGray">{formatFileSize(images[0].file.size)}</p>
                </div>
                <Button
                  aria-label="Add Amenity"
                  isIconOnly
                  radius="sm"
                  size="sm"
                  variant="light"
                  onPress={() => removeFile(images[0].id)}
                >
                  <IoClose className="text-2xl text-accentRed" />
                </Button>
              </div>
            ) : (
              <p className={`flex-1 text-sm font-light ${error ? 'text-danger' : ''}`}>
                {!!value ? 'Image uploaded' : 'Please selected and image to upload'}
              </p>
            )}
            {images.length ? (
              <Button
                className="text-bold text-white"
                color="primary"
                radius="sm"
                size="sm"
                isLoading={isUploading}
                onPress={uploadImage}
              >
                Upload
              </Button>
            ) : (
              <div {...getRootProps()} className="bg-primary/20 px-4 py-2 rounded-xl cursor-pointer">
                <input {...getInputProps()} />
                <p className="text-xs text-primary font-medium">Choose Image</p>
              </div>
            )}
          </div>
        </div>
        <Controller
          control={control}
          render={({ field: { onChange, ref, value }, fieldState: { error } }) => (
            <Input
              name="price"
              label="Item Price"
              placeholder=" "
              type="tel"
              value={value?.toString() || ''}
              onValueChange={(val) => /^\d*$/.test(val) && onChange(+val)}
              isInvalid={!!error}
              errorMessage={error?.message}
              ref={ref}
              className="text-accentGray"
            />
          )}
          name={`menu.${idx}.price`}
          rules={{
            validate: (val) => {
              const isValid = createRestaurantSchema.shape.menu.element.shape.price.safeParse(val);
              return isValid.success || isValid.error.flatten().formErrors.join(', ');
            },
          }}
        />
      </div>
      <StringArrayInput
        arr={category || []}
        label="Item categories"
        prevState={category || []}
        setState={setCategory}
      />
      <StringArrayInput
        arr={dietary || []}
        label="Dietary Provisions for this item"
        prevState={dietary || []}
        setState={setDietary}
      />
    </>
  );
};

export default MenuInputs;
