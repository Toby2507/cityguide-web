'use client';

import { useCustomImageSelect } from '@/hooks';
import { UpdateNightlifeInput, UpdateRestaurantInput, UpdateStayInput } from '@/schemas';
import { updateNightlife, updateRestaurant, updateStay, uploadImages } from '@/server';
import { INightLife, IRestaurant, IStay, PropertyType } from '@/types';
import { createUploadDatas, formatFileSize, getObjDiff } from '@/utils';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from '@nextui-org/react';
import { useState } from 'react';
import { SubmitHandler, useController, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { HiDotsVertical } from 'react-icons/hi';
import { IoClose, IoCloudUploadOutline } from 'react-icons/io5';

interface Props {
  property: IStay | IRestaurant | INightLife;
  type: PropertyType;
  onClose: () => void;
}
type UpdatePropertyInput = UpdateStayInput | UpdateRestaurantInput | UpdateNightlifeInput;

const UpdatePropertyImages = ({ property, type, onClose }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [activeImage, setActiveImage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { control, handleSubmit, reset, watch } = useForm<UpdatePropertyInput>({
    defaultValues: property,
    mode: 'onChange',
  });
  const {
    field: { onChange: setAvatar, value: avatar },
  } = useController({ control, name: 'avatar' });
  const {
    field: { onChange: setImages, value: stayImages = [] },
  } = useController({ control, name: 'images' });
  const { getRootProps, getInputProps, removeFile, clearImages, isDragActive, images, invalidImages } =
    useCustomImageSelect('', []);

  const viewImage = (imgUrl: string) => {
    setActiveImage(imgUrl);
    onOpen();
  };
  const deleteImage = (imgUrl: string) => {
    setImages(stayImages.filter((img) => img !== imgUrl));
  };
  const deleteAvatar = () => setAvatar('');
  const setImageAsAvatar = (imgUrl: string) => {
    const newImages = [...stayImages, avatar].filter((img) => img !== imgUrl);
    setAvatar(imgUrl);
    setImages(newImages);
  };
  const onSubmit: SubmitHandler<UpdatePropertyInput> = async (data) => {
    setIsLoading(true);
    try {
      if (!avatar) return toast.error('Please select an avatar');
      if ([...images, ...stayImages, avatar].length < 8)
        return toast.error('A minimum of 8 images overall is required');
      if (images.length) {
        if (invalidImages.length)
          return toast.error(`${invalidImages.length} image(s) does not meet the minimum quality`);
        const imgs = images.map((img) => img.file);
        const imagesData = createUploadDatas(imgs);
        const imgUrls = await Promise.all(imagesData.map((data) => uploadImages(data)));
        if (imgUrls.every(Boolean)) {
          const imageUrls: string[] = [];
          imgUrls.forEach((img) => imageUrls.push(...img));
          setImages([...stayImages, ...imageUrls]);
        }
        clearImages();
      }
      const updateBody = getObjDiff(watch(), property);
      delete updateBody.updatedAt;
      if (!Object.keys(updateBody).length) {
        onClose();
        return toast.error('No change has been made!');
      }
      if (type === PropertyType.STAY) await updateStay(updateBody, property._id);
      else if (type === PropertyType.RESTAURANT) await updateRestaurant(updateBody, property._id);
      else await updateNightlife(updateBody, property._id);
      onClose();
      reset();
      toast.success('Property images updated successfully!');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-6 p-2">
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
        <ModalContent className="pt-10 pb-4">
          {
            <ModalBody>
              <figure className="w-full h-[70vh] rounded-md overflow-hidden cursor-pointer">
                <Image
                  src={activeImage}
                  width="full"
                  alt="stay"
                  radius="none"
                  removeWrapper
                  className="object-cover h-full w-full"
                />
              </figure>
            </ModalBody>
          }
        </ModalContent>
      </Modal>
      <h3 className="text-2xl text-center font-semibold tracking-wide border-b py-2">Update Property Images</h3>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div
              {...getRootProps()}
              className={`flex flex-col items-center justify-center gap-2 border-2 border-primary border-dashed ${
                isDragActive ? 'bg-secondary/60' : 'bg-bgAccentBlue'
              } rounded-xl h-[20vh] transition-all duration-300 ease-in-out pb-4 my-2`}
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
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-sm text-accentGray">Avatar</p>
            <div className="relative h-28 w-28">
              <Image src={avatar} alt="property avatar" className="w-28 h-28" />
              {avatar ? (
                <Dropdown placement="bottom-end">
                  <DropdownTrigger>
                    <Button
                      aria-label="Add Amenity"
                      className="absolute -top-3 -right-3 z-10 bg-bgLightBlue"
                      isIconOnly
                      radius="sm"
                      size="sm"
                      variant="flat"
                      color="primary"
                    >
                      <HiDotsVertical className="text-lg" />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Accommodation actions" variant="flat">
                    <DropdownItem key="view image" onPress={() => viewImage(avatar)}>
                      View Image
                    </DropdownItem>
                    <DropdownItem key="delete image" color="danger" onPress={deleteAvatar}>
                      Remove Image
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              ) : null}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-sm text-accentGray">Images</p>
            <div className="flex flex-wrap gap-4">
              {stayImages.map((img, i) => (
                <div className="relative h-28 w-28" key={i}>
                  <Image src={img} alt="property avatar" className="w-28 h-28" />
                  <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                      <Button
                        aria-label="Add Amenity"
                        className="absolute -top-3 -right-3 z-10 bg-bgLightBlue"
                        isIconOnly
                        radius="sm"
                        size="sm"
                        variant="flat"
                        color="primary"
                      >
                        <HiDotsVertical className="text-lg" />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Accommodation actions" variant="flat">
                      <DropdownItem key="view image" onPress={() => viewImage(img)}>
                        View Image
                      </DropdownItem>
                      <DropdownItem key="set image as avatar" onPress={() => setImageAsAvatar(img)}>
                        Set as Avatar
                      </DropdownItem>
                      <DropdownItem key="delete image" color="danger" onPress={() => deleteImage(img)}>
                        Remove Image
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Button
        className="text-sm font-semibold px-14 py-6 my-2"
        color="primary"
        radius="full"
        onPress={() => handleSubmit(onSubmit)()}
        isLoading={isLoading}
      >
        Update Images
      </Button>
    </div>
  );
};

export default UpdatePropertyImages;
