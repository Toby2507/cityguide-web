'use client';

import { IPropertyValues, ISetProperty } from '@/types';
import { useEffect, useRef, useState } from 'react';

const useStepManagement = (setProperty: ISetProperty, property: IPropertyValues) => {
  const [step, setStep] = useState<number>(1);
  const [topStep, setTopStep] = useState<number>(1);
  const initialMount = useRef<boolean>(true);

  const handleStep = (newStep: number) => {
    setStep(newStep);
    if (newStep > topStep) setTopStep(newStep);
    setProperty({ step, topStep });
  };
  useEffect(() => {
    if (initialMount.current) {
      if (property?.step) {
        setStep(property.step);
        setTopStep(property.topStep);
        initialMount.current = false;
      }
    }
  }, [property?.step, property?.topStep]);
  return { step, topStep, setStep: handleStep };
};

export default useStepManagement;
