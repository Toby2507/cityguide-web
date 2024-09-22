'use client';

import { stayTypes } from '@/data';
import { usePropertyStore } from '@/providers';
import { createStaySchema } from '@/schemas';
import { ICreateStay, StayType } from '@/types';
import { Button } from '@nextui-org/react';
import { useController, useFormContext } from 'react-hook-form';

interface Props {
  setStep: (newStep: number) => void;
}

const CreateStayStep1 = ({ setStep }: Props) => {
  const { control, watch } = useFormContext<ICreateStay>();
  const { setStay } = usePropertyStore();
  const {
    field: { onChange },
  } = useController({ control, name: 'type' });
  const handleList = (key: StayType) => {
    const isValid = createStaySchema.shape.type.safeParse(key);
    if (!isValid.success) return;
    onChange(key);
    setStay({ property: watch() });
    setStep(2);
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
      <div className="grid grid-cols-6 gap-6">
        {stayTypes.map(({ key, name, desc, Icon }) => (
          <article
            className="flex flex-col items-center justify-between gap-3 p-3 pt-6 rounded-xl border border-accentGray"
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

export default CreateStayStep1;
