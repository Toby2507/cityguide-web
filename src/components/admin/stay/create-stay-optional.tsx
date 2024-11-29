import { CreateStayInput } from '@/schemas';
import { Button, Input, Textarea } from '@nextui-org/react';
import { useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { IoIosRemoveCircle } from 'react-icons/io';
import { IoAdd } from 'react-icons/io5';
import { LuCircleDot } from 'react-icons/lu';

const CreateStayOptionalServices = () => {
  const { control } = useFormContext<CreateStayInput>();
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const {
    field: { value, onChange },
  } = useController({ control, name: 'optionalServices' });

  const addService = () => {
    const service = { title, description };
    if (value?.find((v) => v.title === service.title)) return;
    onChange([...(value || []), service]);
    setTitle('');
    setDescription('');
  };
  const removeService = (title: string) => {
    const services = (value || []).filter((v) => v.title !== title);
    onChange(services);
  };

  return (
    <div className="flex flex-col gap-2">
      <h6 className="text-sm font-semibold">Optional Services</h6>
      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <Input
            name="title"
            label="Service Title"
            labelPlacement="inside"
            placeholder=" "
            size="sm"
            value={title}
            onValueChange={setTitle}
            className="text-accentGray"
          />
          <Textarea
            name="description"
            label="Service Description"
            labelPlacement="inside"
            placeholder=" "
            size="sm"
            value={description}
            onValueChange={setDescription}
            className="text-accentGray"
          />
          <Button
            className="text-xs font-medium pr-4"
            color="primary"
            radius="sm"
            size="sm"
            variant="flat"
            onPress={addService}
            startContent={<IoAdd className="text-lg" />}
          >
            Add Service
          </Button>
        </div>
        {value?.length ? (
          <div className="flex flex-col gap-3 border rounded-xl p-3 overflow-auto">
            {value.map(({ title, description }) => (
              <div className="flex items-start gap-1" key={title}>
                <LuCircleDot className="pt-1" />
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium">{title}</p>
                  <p className="text-xs">{description}</p>
                </div>
                <Button
                  aria-label="Add Service"
                  isIconOnly
                  radius="sm"
                  size="sm"
                  variant="light"
                  color="danger"
                  onPress={() => removeService(title)}
                >
                  <IoIosRemoveCircle className="text-lg" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid place-items-center border rounded-xl p-2">
            <p className="text-sm text-accentGray2 font-light">No optional services</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateStayOptionalServices;
