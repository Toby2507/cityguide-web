'use client';

import { useCustomImageSelect } from '@/hooks';
import { uploadImages } from '@/server';
import { createUploadDatas, formatFileSize } from '@/utils';
import { Button, Image } from '@nextui-org/react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';
import { IoClose, IoCloudUploadOutline } from 'react-icons/io5';
import CreateNavButtons from './create-nav-buttons';

interface Props {
  name?: string;
  nextStep: number;
  setStep: Dispatch<SetStateAction<number>>;
}
const CreatePropertyImageUpload = ({ name, nextStep, setStep }: Props) => {
  const { control } = useFormContext();
  const {
    field: { onChange: changeAvatar, value },
  } = useController({ control, name: 'avatar' });
  const {
    field: { onChange: changeImages, value: uploadedImages = [] },
  } = useController({ control, name: 'images' });
  const {
    field: { onChange: setImgIds, value: imgIds = [] },
  } = useController({ control, name: 'tempImgIds' });
  const { getRootProps, getInputProps, removeFile, setAvatar, isDragActive, avatar, images, invalidImages } =
    useCustomImageSelect(value, imgIds);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleUpload = async () => {
    setIsLoading(true);
    try {
      const isValidImgsLength = uploadedImages.length ? [...uploadedImages, ...images].length < 11 : images.length < 12;
      if (isValidImgsLength) return toast.error('Atleast 12 Images are required');
      if (!avatar) return toast.error('Please select an avatar');
      if (invalidImages.length)
        return toast.error(`${invalidImages.length} image(s) does not meet the minimum quality`);
      const avatarData = new FormData();
      const imgs: File[] = [];
      images.forEach((image) => {
        if (image.id === avatar) avatarData.append('images', image.file);
        else imgs.push(image.file);
      });
      const imagesData = createUploadDatas(imgs);
      try {
        const [avatarUrl, ...imagesUrls] = await Promise.all([
          uploadImages(avatarData),
          ...imagesData.map((data) => uploadImages(data)),
        ]);
        avatarUrl && changeAvatar(avatarUrl[0]);
        if (imagesUrls.every(Boolean)) {
          const imgUrls: string[] = [];
          imagesUrls.forEach((img) => imgUrls.push(...img));
          changeImages([...uploadedImages, ...imgUrls]);
        }
        setImgIds([...imgIds, ...images.map((i) => i.id)]);
        setStep(7);
      } catch (err) {
        toast.error('Failed to upload images');
      }
    } finally {
      setIsLoading(false);
    }
    setStep(nextStep);
  };

  return (
    <div className="flex flex-col justify-center gap-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl text-center font-semibold">Upload {name || 'Property'} Image</h1>
        <p className="text-center font-light">
          Show off your space! Upload stunning images of your {name?.toLowerCase() || 'property'}.
        </p>
      </div>
      <div className="flex flex-col gap-4 w-10/12 mx-auto">
        <div
          {...getRootProps()}
          className={`flex flex-col items-center justify-center gap-2 border-2 border-primary border-dashed ${
            isDragActive ? 'bg-secondary/60' : 'bg-bgAccentBlue'
          } rounded-xl h-[25vh] transition-all duration-300 ease-in-out pb-4`}
        >
          <IoCloudUploadOutline className="text-6xl text-primary" />
          <input {...getInputProps()} />
          <p className="text-sm font-medium">
            Drag and drop your files here or click to&nbsp;
            <span className="font-semibold !text-primary cursor-pointer hover:underline">browse</span>
          </p>
          <span className="text-xs text-accentGray font-light">
            Maximum size: 10MB, Minimum quality: 480p, Minimum of 12 images
          </span>
        </div>
        {value ? (
          <p className="text-xs text-center text-accentGray font-light">
            {[value, ...uploadedImages].length} image(s) uploaded, Select more to upload
          </p>
        ) : null}
        {images.length && !value ? (
          <p className="text-xs text-center text-accentGray font-light">
            Click on any of the selected images to set it as your display image
          </p>
        ) : null}
        <div className="grid grid-cols-3 gap-2 items-center">
          {images.map(({ file, id }) => (
            <div
              key={id}
              onClick={() => !value && setAvatar(id)}
              className={`flex items-center gap-2 p-2 rounded-xl cursor-pointer ${
                invalidImages.includes(id) ? 'bg-red-50' : id === avatar ? 'bg-secondary/60' : 'bg-bgAccentBlue'
              }`}
            >
              <div className="grid place-items-center h-14 object-cover w-14">
                <Image src={URL.createObjectURL(file)} alt={file.name} className="w-14 h-14 object-cover" />
              </div>
              <div className="flex-1 flex flex-col">
                <p className="text-sm font-medium">{file.name}</p>
                <p className="text-xs text-accentGray">{formatFileSize(file.size)}</p>
              </div>
              <Button aria-label="Add Amenity" isIconOnly radius="sm" variant="light" onPress={() => removeFile(id)}>
                <IoClose className="text-3xl text-accentRed" />
              </Button>
            </div>
          ))}
        </div>
      </div>
      <CreateNavButtons
        isLoading={isLoading}
        nextText={images.length ? 'Upload' : 'Next'}
        previous={() => setStep(nextStep - 2)}
        next={handleUpload}
      />
      {/* {images.length || value ? (
      <CreateNavButtons
        isLoading={isLoading}
        nextText={images.length ? 'Upload' : 'Next'}
        previous={() => setStep(nextStep - 2)}
        next={handleUpload}
      />
      ) : null} */}
    </div>
  );
};

export default CreatePropertyImageUpload;
