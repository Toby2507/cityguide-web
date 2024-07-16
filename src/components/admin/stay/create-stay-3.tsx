import { Rating, StayType } from '@/types';
import { createStaySchema } from '@/utils';
import { Button, Input, Textarea } from '@nextui-org/react';
import { Dispatch, SetStateAction } from 'react';
import { Control, Controller, FieldValues, UseFormTrigger, UseFormWatch } from 'react-hook-form';
import toast from 'react-hot-toast';
import { IoStar, IoStarOutline } from 'react-icons/io5';
import CreateStayButtons from './create-stay-btns';

interface ICreateStay {
  control: Control<FieldValues, any>;
  trigger: UseFormTrigger<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  setStep: Dispatch<SetStateAction<number>>;
}

const CreateStayStep3 = ({ control, trigger, watch, setStep }: ICreateStay) => {
  const handleNext = async () => {
    const [isValidS, isValidT] = await Promise.all([
      createStaySchema.shape.hotelRating.safeParseAsync(watch('hotelRating')),
      trigger(['name', 'summary', 'language']),
    ]);
    if (!isValidS.success || !isValidT) return toast.error('Please fill in the required fields');
    setStep(4);
  };

  return (
    <div className="flex flex-col justify-center gap-4 pt-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl text-center font-semibold">Basic Property Information</h1>
        <p className="text-center font-light">
          Tell us about your space! Fill in the details to showcase your Cityguidex listing.
        </p>
      </div>
      <div className="flex flex-col gap-4 max-w-3xl py-2 mx-auto w-full">
        <Controller
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input
              name="name"
              label="Property Name"
              labelPlacement="outside"
              placeholder=" "
              radius="full"
              isRequired
              value={value}
              onChange={onChange}
              isInvalid={!!error}
              errorMessage={error?.message}
              className="text-accentGray"
            />
          )}
          name="name"
          rules={{
            validate: (val) => {
              const isValid = createStaySchema.shape.name.safeParse(val);
              return isValid.success || isValid.error.flatten().formErrors.join(', ');
            },
          }}
        />
        <Controller
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Textarea
              name="summary"
              label="Property Summary"
              labelPlacement="outside"
              placeholder=" "
              radius="full"
              isRequired
              value={value}
              onChange={onChange}
              isInvalid={!!error}
              errorMessage={error?.message}
              className="text-accentGray"
            />
          )}
          name="summary"
          rules={{
            validate: (val) => {
              const isValid = createStaySchema.shape.summary.safeParse(val);
              return isValid.success || isValid.error.flatten().formErrors.join(', ');
            },
          }}
        />
        <Controller
          control={control}
          render={({ field: { onChange }, fieldState: { error } }) => (
            <Input
              name="language"
              label="Language Spoken (Separate with commas)"
              labelPlacement="outside"
              placeholder=" "
              radius="full"
              isRequired
              onChange={(e) => onChange(e.target.value.split(',').map((i) => i.trim()))}
              isInvalid={!!error}
              errorMessage={error?.message}
              className="text-accentGray"
            />
          )}
          name="language"
          rules={{
            validate: (val) => {
              const isValid = createStaySchema.shape.language.safeParse(val);
              return isValid.success || isValid.error.flatten().formErrors.join(', ');
            },
          }}
        />
        {watch('type') === StayType.HOTEL ? (
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <div className="flex flex-col gap-2">
                <h4 className="text-accentGray text-sm font-semibold">Hotel Rating</h4>
                <div className="flex items-center gap-4">
                  {Object.values(Rating)
                    .filter((i) => Number(i))
                    .map((rating) => {
                      const isActive = rating <= value;
                      return (
                        <Button
                          key={rating}
                          aria-label={`rating-${rating}`}
                          isIconOnly
                          radius="sm"
                          variant="light"
                          onClick={() => onChange(rating)}
                        >
                          {isActive ? (
                            <IoStar className="text-5xl text-accentGold" />
                          ) : (
                            <IoStarOutline className="text-5xl text-accentGold" />
                          )}
                        </Button>
                      );
                    })}
                </div>
              </div>
            )}
            name="hotelRating"
            defaultValue={Rating.NO_RATING}
          />
        ) : null}
      </div>
      <CreateStayButtons previous={() => setStep(2)} next={handleNext} />
    </div>
  );
};

export default CreateStayStep3;
