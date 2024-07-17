'use client';

import { formatFileSize } from '@/utils';
import { Button, Card, Image } from '@nextui-org/react';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { IoClose, IoCloudUploadOutline } from 'react-icons/io5';

interface CustomFile {
  id: string;
  file: File;
}

const CreateStayStep6 = () => {
  const [avatar, setAvatar] = useState<CustomFile>();
  const [images, setImages] = useState<CustomFile[]>([]);
  const onDrop = useCallback(
    (files: File[]) => {
      let tFiles = files.map((f) => ({ id: `${f.name}-${f.size}-${f.type}`, file: f }));
      tFiles = tFiles.filter((file) => !images.some((i) => i.id === file.id));
      if (!avatar) setAvatar(tFiles[0]);
      setImages((prev) => [...prev, ...tFiles]);
    },
    [avatar, images]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const removeFile = (id: string) => setImages((prev) => prev.filter((file) => file.id !== id));
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
          Click on any selected image to set it as your display image
        </p>
        <div className="grid grid-cols-3 gap-2 items-center">
          {images.map(({ file, id }) => (
            <div
              key={id}
              onClick={() => setAvatar({ file, id })}
              className={`flex items-center gap-2 p-2 rounded-xl cursor-pointer ${
                id === avatar?.id ? 'bg-secondary/60' : 'bg-bgAccentBlue'
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
    </div>
  );
};

export default CreateStayStep6;
