import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';

interface ICustomFile {
  id: string;
  file: File;
}

const useCustomImageSelect = (
  value?: string,
  imgIds: string[] = [],
  isAvatar: boolean = true,
  multiple: boolean = true,
  noDrag: boolean = false
) => {
  const [avatar, setAvatar] = useState<string>(value || '');
  const [images, setImages] = useState<ICustomFile[]>([]);
  const [invalidImages, setInvalidImages] = useState<string[]>([]);
  const onDrop = useCallback(
    async (files: File[]) => {
      let tFiles = files.map((f) => ({ id: `${f.name}-${f.size}-${f.type}`, file: f }));
      tFiles = tFiles.filter((file) => {
        if (!imgIds.includes(file.id) && !images.some((i) => i.id === file.id)) return true;
        toast.error('File already exists');
        return false;
      });
      if (!avatar && isAvatar) setAvatar(tFiles[0]?.id);
      await Promise.all(
        tFiles.map(async (image) => {
          const { width, height } = await createImageBitmap(image.file);
          if (width * height < 307200) setInvalidImages((prev) => [...prev, image.id]);
        })
      );
      setImages((prev) => [...prev, ...tFiles]);
    },
    [avatar, images, imgIds, isAvatar]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple, noDrag });

  const removeFile = (id: string) => {
    setImages((prev) => prev.filter((file) => file.id !== id));
    setInvalidImages((prev) => prev.filter((file) => file !== id));
  };

  const clearImages = () => {
    setAvatar('');
    setImages([]);
    setInvalidImages([]);
  };

  return {
    avatar,
    images,
    invalidImages,
    isDragActive,
    setAvatar,
    getRootProps,
    getInputProps,
    removeFile,
    clearImages,
  };
};

export default useCustomImageSelect;
