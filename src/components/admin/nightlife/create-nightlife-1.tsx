'use client';

import { nightLifeTypes } from '@/data';
import { usePropertyStore } from '@/providers';
import { createNightlifeSchema } from '@/schemas';
import { ICreateNightlife, NightLifeType } from '@/types';
import { Button } from '@nextui-org/react';
import { useController, useFormContext } from 'react-hook-form';

interface Props {
  setStep: (newStep: number) => void;
}

const CreateNightlifeStep1 = ({ setStep }: Props) => {
  const { control, watch } = useFormContext<ICreateNightlife>();
  const { setNightlife } = usePropertyStore();
  const {
    field: { onChange },
  } = useController({ control, name: 'type' });

  const handleList = (key: NightLifeType) => {
    const isValid = createNightlifeSchema.shape.type.safeParse(key);
    if (!isValid.success) return;
    onChange(key);
    setStep(2);
    setNightlife({ property: watch() });
  };
  return (
    <div className="flex flex-col justify-center gap-14 pt-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl text-center font-semibold">
          In no time at all, begin receiving visitors by listing your home on Cityguidex!
        </h1>
        <p className="text-center font-light">
          To get started, select the type of property you want to list on Cityguidex
        </p>
      </div>
      <div className="flex justify-center gap-6">
        {nightLifeTypes.map(({ key, name, desc, Icon }) => (
          <article
            className="flex flex-col items-center justify-between gap-3 p-3 pt-6 rounded-xl border border-accentGray w-72"
            key={key}
          >
            <div className="flex flex-col items-center gap-3">
              <Icon className="text-primary text-6xl" />
              <h4 className="text-xl font-semibold">{name}</h4>
              <p className="text-xs text-center font-light">{desc}</p>
            </div>
            <Button
              className="text-xs font-semibold rounded-full w-full"
              color="primary"
              onPress={() => handleList(key)}
            >
              List your property
            </Button>
          </article>
        ))}
      </div>
    </div>
  );
};

export default CreateNightlifeStep1;
