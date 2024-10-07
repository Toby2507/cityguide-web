'use client';

import { HotelRating, IAccommodation } from '@/types';
import { Button, Image, Link, Modal, ModalBody, ModalContent } from '@nextui-org/react';
import { useState } from 'react';
import { PiCaretLeftBold, PiCaretRightBold } from 'react-icons/pi';
import { RxCaretLeft } from 'react-icons/rx';
import CustomStars from './custom-stars';
import React from 'react';

interface Props {
  isOpen: boolean;
  name: string;
  images: string[];
  avatar: string;
  accommodation?: IAccommodation[];
  hotelRating?: HotelRating;
  onOpenChange: () => void;
}

const ImageModal = ({ isOpen, onOpenChange, name, hotelRating, avatar, images, accommodation }: Props) => {
  const [activeTab, setActiveTab] = useState<string>('General');
  const [viewType, setViewType] = useState<string>('grid');
  const [activeImage, setActiveImage] = useState<number>(0);
  const tabs = [
    { name: 'General', avatar, images: [avatar, ...images] },
    ...(accommodation?.map((a) => ({ name: a.name, avatar: a.images[0], images: a.images })) || []),
  ];
  const currentImages = tabs.find((t) => t.name === activeTab)?.images!;

  const viewImage = (idx: number) => {
    setViewType('cinema');
    setActiveImage(idx);
  };
  const goForward = () => {
    if (activeImage >= currentImages.length - 1) return;
    setActiveImage((prev) => prev + 1);
  };
  const goBackward = () => {
    if (activeImage <= 0) return;
    setActiveImage((prev) => prev - 1);
  };
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="bottom" size="5xl" scrollBehavior="inside">
      <ModalContent className="h-[90vh]">
        {(onClose) => (
          <ModalBody>
            <div className="relative flex items-center justify-center gap-2 border-b py-2">
              <h3 className="text-xl font-semibold tracking-wide">{name}</h3>
              {hotelRating && <CustomStars value={hotelRating} />}
              <Link href="#availability">
                <Button color="primary" className="px-10 font-semibold" radius="sm" size="sm" onPress={onClose}>
                  Book now
                </Button>
              </Link>
              {viewType === 'cinema' && (
                <Button
                  className="absolute left-0 pr-4 gap-0"
                  size="sm"
                  color="primary"
                  variant="light"
                  startContent={<RxCaretLeft size={20} />}
                  onPress={() => setViewType('grid')}
                >
                  Gallery
                </Button>
              )}
            </div>
            {viewType === 'grid' ? (
              <>
                <div className="flex items-center gap-4">
                  {tabs.map(({ name, avatar }) => (
                    <div className="flex flex-col items-center gap-1" key={name}>
                      <figure
                        className={`h-20 rounded-lg overflow-hidden cursor-pointer p-[1px] border-2 ${
                          activeTab === name ? 'border-primary' : 'border-transparent'
                        }`}
                      >
                        <Image
                          src={avatar}
                          width="full"
                          alt="stay"
                          height={48}
                          radius="none"
                          isZoomed
                          removeWrapper
                          className="object-cover h-full w-full rounded-md"
                          onClick={() => setActiveTab(name)}
                        />
                      </figure>
                      <p className="text-xs font-medium">{name}</p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-4 content-start gap-2">
                  {currentImages?.map((image, idx) => (
                    <figure key={idx} className="w-full rounded-md overflow-hidden cursor-pointer">
                      <Image
                        src={image}
                        width="full"
                        alt="stay"
                        radius="none"
                        isZoomed
                        removeWrapper
                        className="object-cover h-full w-full"
                        onClick={() => viewImage(idx)}
                      />
                    </figure>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full gap-6">
                <Button
                  isDisabled={activeImage <= 0}
                  color="default"
                  isIconOnly
                  radius="full"
                  size="lg"
                  variant="light"
                  onPress={goBackward}
                >
                  <PiCaretLeftBold size={40} />
                </Button>
                <figure className="w-full h-[70vh] rounded-md overflow-hidden cursor-pointer">
                  <Image
                    src={currentImages[activeImage]}
                    width="full"
                    alt="stay"
                    radius="none"
                    removeWrapper
                    className="object-cover h-full w-full"
                  />
                </figure>
                <Button
                  isDisabled={activeImage >= currentImages.length - 1}
                  color="default"
                  isIconOnly
                  size="lg"
                  radius="full"
                  variant="light"
                  onPress={goForward}
                >
                  <PiCaretRightBold size={40} />
                </Button>
              </div>
            )}
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ImageModal;
