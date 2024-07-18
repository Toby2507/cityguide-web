'use client';

import { uploadImages } from '@/server';
import { formatFileSize } from '@/utils';
import { Button, Image } from '@nextui-org/react';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Control, FieldValues, useController } from 'react-hook-form';
import { IoClose, IoCloudUploadOutline } from 'react-icons/io5';
import CreateStayButtons from './create-stay-btns';

interface ICreateStay {
  control: Control<FieldValues>;
  setStep: Dispatch<SetStateAction<number>>;
}
interface ICustomFile {
  id: string;
  file: File;
}

const CreateStayStep6 = ({ control, setStep }: ICreateStay) => {
  const [avatar, setAvatar] = useState<string>('');
  const [images, setImages] = useState<ICustomFile[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onDrop = useCallback(
    (files: File[]) => {
      let tFiles = files.map((f) => ({ id: `${f.name}-${f.size}-${f.type}`, file: f }));
      tFiles = tFiles.filter((file) => !images.some((i) => i.id === file.id));
      if (!avatar) setAvatar(tFiles[0].id);
      setImages((prev) => [...prev, ...tFiles]);
    },
    [avatar, images]
  );
  const {
    field: { onChange: changeAvatar, value },
  } = useController({ control, name: 'avatar' });
  const {
    field: { onChange: changeImages },
  } = useController({ control, name: 'images' });
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const removeFile = (id: string) => setImages((prev) => prev.filter((file) => file.id !== id));
  const handleUpload = async () => {
    setIsLoading(true);
    const avatarData = new FormData();
    const imagesData = new FormData();
    images.forEach((image) => {
      if (image.id === avatar) avatarData.append('images', image.file);
      else imagesData.append('images', image.file);
    });
    const imgUrls = await Promise.all([uploadImages(avatarData), uploadImages(imagesData)]);
    changeAvatar(imgUrls[0][0]);
    changeImages(imgUrls[1]);
    setIsLoading(false);
    setStep(7);
  };
  return (
    <div className="flex flex-col justify-center gap-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl text-center font-semibold">Upload Property Image</h1>
        <p className="text-center font-light">Show off your space! Upload stunning images of your property.</p>
      </div>
      <div className="flex flex-col gap-4 w-10/12 mx-auto">
        <div
          {...getRootProps()}
          className={`flex flex-col items-center justify-center gap-2 border-2 border-primary border-dashed ${
            isDragActive ? 'bg-secondary/60' : 'bg-bgAccentBlue'
          } rounded-xl h-[25vh] transition-all duration-300 ease-in-out`}
        >
          <IoCloudUploadOutline className="text-6xl text-primary" />
          <input {...getInputProps()} />
          <p className="text-sm font-medium">
            Drag and drop your files here or click to&nbsp;
            <span className="font-semibold !text-primary cursor-pointer hover:underline">browse</span>
          </p>
          <span className="text-xs text-accentGray font-light">Maximum size: 10MB</span>
        </div>
        <p className="text-xs text-center text-accentGray font-light pt-4">
          Click on any of the selected images to set it as your display image
        </p>
        <div className="grid grid-cols-3 gap-2 items-center">
          {images.map(({ file, id }) => (
            <div
              key={id}
              onClick={() => setAvatar(id)}
              className={`flex items-center gap-2 p-2 rounded-xl cursor-pointer ${
                id === avatar ? 'bg-secondary/60' : 'bg-bgAccentBlue'
              }`}
            >
              <figure className="h-14 w-14">
                <Image src={URL.createObjectURL(file)} alt={file.name} />
              </figure>
              <div className="flex-1 flex flex-col">
                <p className="text-sm font-medium">{file.name}</p>
                <p className="text-xs text-accentGray">{formatFileSize(file.size)}</p>
              </div>
              <Button aria-label="Add Amenity" isIconOnly radius="sm" variant="light" onClick={() => removeFile(id)}>
                <IoClose className="text-3xl text-accentRed" />
              </Button>
            </div>
          ))}
        </div>
      </div>
      {images.length || value ? (
        <CreateStayButtons isLoading={isLoading} nextText="Upload" previous={() => setStep(5)} next={handleUpload} />
      ) : null}
    </div>
  );
};

export default CreateStayStep6;
