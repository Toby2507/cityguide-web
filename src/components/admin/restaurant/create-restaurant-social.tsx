'use client';

import { ISocialLink } from '@/types';
import { Button, Input } from '@nextui-org/react';
import { useState } from 'react';
import { IoAdd } from 'react-icons/io5';
import { PiMinus } from 'react-icons/pi';

interface Props extends ISocialLink {
  addSocial: (social: ISocialLink) => void;
  removeSocial: () => void;
}

const CreateRestaurantSocial = ({ name, handle, addSocial, removeSocial }: Props) => {
  const [platform, setPlatform] = useState<string>(name);
  const [socialHandle, setSocialHandle] = useState<string>(handle);

  const isNew = name !== platform || handle !== socialHandle;

  const onSubmit = () => {
    if (name === platform && handle === socialHandle) return;
    addSocial({ name: platform, handle: socialHandle });
  };
  return (
    <div className="flex items-center gap-2">
      <Input
        name="platform"
        label="Platform"
        labelPlacement="inside"
        placeholder=" "
        radius="sm"
        value={platform}
        onValueChange={setPlatform}
        className="text-accentGray"
      />
      <Input
        name="handle"
        label="Handle"
        labelPlacement="inside"
        placeholder=" "
        radius="sm"
        value={socialHandle}
        onValueChange={setSocialHandle}
        className="text-accentGray"
      />
      <Button
        color="primary"
        radius="full"
        size="sm"
        variant="flat"
        isIconOnly
        aria-label="Add a new social media platform"
        onPress={isNew ? onSubmit : removeSocial}
      >
        {isNew ? <IoAdd className="text-lg" /> : <PiMinus className="text-lg" />}
      </Button>
    </div>
  );
};

export default CreateRestaurantSocial;
