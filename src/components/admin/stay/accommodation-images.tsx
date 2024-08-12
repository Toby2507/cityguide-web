import { useCustomImageSelect } from '@/hooks';
import { createStaySchema } from '@/schemas';
import { uploadImages } from '@/server';
import { createUploadDatas, formatFileSize } from '@/utils';
import { Button, Image, Modal, ModalBody, ModalContent, ModalFooter, useDisclosure } from '@nextui-org/react';
import { useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';
import { IoAdd, IoClose, IoCloudUploadOutline } from 'react-icons/io5';

interface Props {
  idx: number;
}

const AccommodationImages = ({ idx }: Props) => {
  const { control } = useFormContext();
  const {
    field: { onChange, value = [] },
    fieldState: { error },
  } = useController({
    control,
    name: `accommodation.${idx}.images`,
    rules: {
      validate: (val) => {
        const isValid = createStaySchema.shape.accommodation.element.shape.images.safeParse(val);
        return isValid.success || isValid.error.flatten().formErrors.join(', ');
      },
    },
  });
  const {
    field: { onChange: setAccIds, value: accIds = [] },
  } = useController({ control, name: `tempAccIdx${idx}` });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { getRootProps, getInputProps, removeFile, clearImages, isDragActive, images, invalidImages } =
    useCustomImageSelect('', accIds);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleUpload = async (close: () => void) => {
    setIsLoading(true);
    try {
      if (!images.length) return toast.error('Please select an image to be uploaded');
      if ([...value, ...images].length < 4) return toast.error('Atleast 4 images are needed for each accommodation');
      if (invalidImages.length)
        return toast.error(`${invalidImages.length} image(s) does not meet the minimum quality`);
      const imagesData = createUploadDatas(images.map((img) => img.file));
      try {
        const imageUrls = await Promise.all(imagesData.map((img) => uploadImages(img)));
        const imgUrls: string[] = [];
        imageUrls.forEach((img) => imgUrls.push(...img));
        onChange([...value, ...imgUrls]);
        setAccIds([...accIds, ...images.map((i) => i.id)]);
        clearImages();
        close();
      } catch (err) {
        toast.error('Failed to upload images');
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-10">
          <h4 className="text-accentGray font-semibold text-sm">Accommodation Images</h4>
          <Button
            className="text-xs font-medium pr-4"
            color={!!error ? 'danger' : 'default'}
            radius="full"
            size="sm"
            variant="flat"
            onPress={onOpen}
            startContent={<IoAdd className="text-lg" />}
          >
            Add
          </Button>
        </div>
        {!!error ? (
          <p className="text-xs text-red-500">{error.message}</p>
        ) : (
          <p className="text-xs text-accentGray font-light">{value.length} image(s) uploaded</p>
        )}
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} size="4xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <div
                  {...getRootProps()}
                  className={`flex flex-col items-center justify-center gap-2 border-2 border-primary border-dashed ${
                    isDragActive ? 'bg-secondary/60' : 'bg-bgAccentBlue'
                  } rounded-xl h-[20vh] transition-all duration-300 ease-in-out pb-4 mt-6 mb-4`}
                >
                  <IoCloudUploadOutline className="text-6xl text-primary" />
                  <input {...getInputProps()} />
                  <p className="text-sm font-medium">
                    Drag and drop your files here or click to&nbsp;
                    <span className="font-semibold !text-primary cursor-pointer hover:underline">browse</span>
                  </p>
                  <span className="text-xs text-accentGray font-light">
                    Maximum size: 10MB, Minimum quality: 480p, Minimum of 4 images
                  </span>
                </div>
                {value ? (
                  <p className="text-xs text-center text-accentGray font-light">
                    {value.length} image(s) uploaded, Select more to upload
                  </p>
                ) : null}
                <div className="grid grid-cols-3 gap-2 items-center">
                  {images.map(({ file, id }) => (
                    <div
                      key={id}
                      className={`flex items-center gap-2 p-2 rounded-xl cursor-pointer ${
                        invalidImages.includes(id) ? 'bg-red-50' : 'bg-bgAccentBlue'
                      }`}
                    >
                      <div className="grid place-items-center h-14 object-cover w-14">
                        <Image src={URL.createObjectURL(file)} alt={file.name} className="w-14 h-14 object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col">
                        <p className="text-sm font-medium">{file.name}</p>
                        <p className="text-xs text-accentGray">{formatFileSize(file.size)}</p>
                      </div>
                      <Button
                        aria-label="Add Amenity"
                        isIconOnly
                        radius="sm"
                        variant="light"
                        onPress={() => removeFile(id)}
                      >
                        <IoClose className="text-3xl text-accentRed" />
                      </Button>
                    </div>
                  ))}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" isLoading={isLoading} onPress={() => handleUpload(onClose)}>
                  Upload
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AccommodationImages;
