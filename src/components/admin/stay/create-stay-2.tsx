import { Map } from '@/components';
import { Dispatch, SetStateAction } from 'react';
import { Control, FieldValues, useController } from 'react-hook-form';
import CreateStayButtons from './create-stay-btns';
import { createStaySchema } from '@/utils';
import toast from 'react-hot-toast';

interface ICreateStay {
  control: Control<FieldValues, any>;
  setStep: Dispatch<SetStateAction<number>>;
}

const CreateStayStep2 = ({ control, setStep }: ICreateStay) => {
  const {
    field: { onChange, value },
  } = useController({ control, name: 'address' });
  const handleNext = () => {
    const isValid = createStaySchema.shape.address.safeParse(value);
    if (!isValid.success) return toast.error('Please select a valid address');
    setStep(3);
  };
  return (
    <div className="flex flex-col justify-center gap-4 pt-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl text-center font-semibold">Where is your property located?</h1>
        <p className="text-center font-light">Unlock potential guests! Pinpoint your property&apos;s address</p>
      </div>
      <div className="w-10/12 mx-auto">
        <Map
          center={{ lat: 6.515758749836156, lng: 3.389845490455627 }}
          prevAddr={value}
          customClass="h-[65vh]"
          setAddr={(addr) => onChange(addr)}
        />
      </div>
      <CreateStayButtons previous={() => setStep(1)} next={handleNext} />
    </div>
  );
};

export default CreateStayStep2;
