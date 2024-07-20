'use client';

import { uploadImages } from '@/server';
import { formatFileSize } from '@/utils';
import { Button, Image } from '@nextui-org/react';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useController, useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';
import { IoClose, IoCloudUploadOutline } from 'react-icons/io5';
import CreateStayButtons from './create-stay-btns';

interface Props {
  setStep: Dispatch<SetStateAction<number>>;
}
interface ICustomFile {
  id: string;
  file: File;
}

const CreateStayStep6 = ({ setStep }: Props) => {
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
  const [avatar, setAvatar] = useState<string>(value || '');
  const [images, setImages] = useState<ICustomFile[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onDrop = useCallback(
    (files: File[]) => {
      let tFiles = files.map((f) => ({ id: `${f.name}-${f.size}-${f.type}`, file: f }));
      tFiles = tFiles.filter((file) => {
        if (!imgIds.includes(file.id) && !images.some((i) => i.id === file.id)) return true;
        toast.error('File already exists');
        return false;
      });
      if (!avatar) setAvatar(tFiles[0].id);
      setImages((prev) => [...prev, ...tFiles]);
    },
    [avatar, images, imgIds]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const removeFile = (id: string) => setImages((prev) => prev.filter((file) => file.id !== id));
  const handleUpload = async () => {
    setIsLoading(true);
    if (images.length) {
      const avatarData = new FormData();
      const imagesData = new FormData();
      images.forEach((image) => {
        if (image.id === avatar) avatarData.append('images', image.file);
        else imagesData.append('images', image.file);
      });
      try {
        const imgUrls = await Promise.all([uploadImages(avatarData), uploadImages(imagesData)]);
        imgUrls[0] && changeAvatar(imgUrls[0][0]);
        imgUrls[1] && changeImages([...uploadedImages, ...imgUrls[1]]);
        setImgIds([...imgIds, ...images.map((i) => i.id)]);
      } catch (err) {
        toast.error('Failed to upload images');
      }
    }
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
          } rounded-xl h-[25vh] transition-all duration-300 ease-in-out pb-4`}
        >
          <IoCloudUploadOutline className="text-6xl text-primary" />
          <input {...getInputProps()} />
          <p className="text-sm font-medium">
            Drag and drop your files here or click to&nbsp;
            <span className="font-semibold !text-primary cursor-pointer hover:underline">browse</span>
          </p>
          <span className="text-xs text-accentGray font-light">Maximum size: 10MB</span>
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
        <CreateStayButtons
          isLoading={isLoading}
          nextText={images.length ? 'Upload' : 'Next'}
          previous={() => setStep(5)}
          next={handleUpload}
        />
      ) : null}
    </div>
  );
};

export default CreateStayStep6;
