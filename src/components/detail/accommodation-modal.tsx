'use client';

import { coreAmenities } from '@/data';
import { IAccommodation } from '@/types';
import { formatAccomodationDetails } from '@/utils';
import { Button, Image, Modal, ModalBody, ModalContent } from '@nextui-org/react';
import { useMemo, useState } from 'react';
import { IconType } from 'react-icons';
import { FaUserAlt } from 'react-icons/fa';
import { IoCheckmark } from 'react-icons/io5';
import { PiCaretLeftBold, PiCaretRightBold } from 'react-icons/pi';

interface Props {
  accommodation: IAccommodation;
  isOpen: boolean;
  reservationInfo: { id: string; title: string; description: string[] }[];
  onOpenChange: () => void;
}
interface ICore {
  name: string;
  Icon: IconType;
}

const AccommodationModal = ({ accommodation, isOpen, reservationInfo, onOpenChange }: Props) => {
  const [activeImg, setActiveImg] = useState(0);
  const images = accommodation.images;
  const [core, custom] = useMemo(() => {
    let core: ICore[] = [];
    let custom: string[] = [];
    accommodation.amenities?.forEach((amenity) => {
      const isCore = coreAmenities.find((a) => a.name.toLowerCase() === amenity.toLowerCase());
      if (isCore) core.push(isCore);
      else custom.push(amenity);
    });
    return [core, custom];
  }, [accommodation.amenities]);

  const goForward = () => {
    if (activeImg >= images.length - 1) setActiveImg(0);
    else setActiveImg((prev) => prev + 1);
  };
  const goBackward = () => {
    if (activeImg <= 0) setActiveImg(images.length - 1);
    else setActiveImg((prev) => prev - 1);
  };
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      classNames={{ base: 'max-w-full py-3 max-h-[95vh] w-[75vw]' }}
      scrollBehavior="inside"
    >
      <ModalContent>
        {(onClose) => (
          <ModalBody>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 flex flex-col gap-2">
                <div className="relative flex items-center justify-between gap-6 w-full p-2 h-[70vh]">
                  <Button color="default" isIconOnly radius="full" size="lg" variant="flat" onPress={goBackward}>
                    <PiCaretLeftBold size={40} />
                  </Button>
                  <figure className="absolute top-0 left-0 bottom-0 right-0 rounded-md overflow-hidden cursor-pointer -z-10">
                    <Image
                      src={images[activeImg]}
                      width="full"
                      alt="stay"
                      radius="none"
                      removeWrapper
                      className="object-cover h-full w-full"
                    />
                  </figure>
                  <Button color="default" isIconOnly size="lg" radius="full" variant="flat" onPress={goForward}>
                    <PiCaretRightBold size={40} />
                  </Button>
                </div>
                <div className="flex items-center gap-1">
                  {images.map((image, idx) => (
                    <figure
                      onClick={() => setActiveImg(idx)}
                      key={idx}
                      className="relative w-44 h-16 rounded-md overflow-hidden cursor-pointer"
                    >
                      <Image
                        src={image}
                        width="full"
                        alt="stay"
                        radius="none"
                        removeWrapper
                        className="object-cover h-full w-full"
                      />
                      <div
                        className={`absolute top-0 bottom-0 right-0 left-0 inset-0 border-2 z-10 ${
                          activeImg === idx ? 'border-primary' : 'border-transparent'
                        }`}
                      />
                    </figure>
                  ))}
                </div>
              </div>
              <div className="col-span-1 flex flex-col gap-4">
                <h3 className="text-2xl font-semibold">{accommodation.name}</h3>
                <div className="flex flex-wrap items-center gap-2">
                  {formatAccomodationDetails(accommodation).map(({ title, value, Icon }) => (
                    <div key={title} className="flex items-center gap-1">
                      <Icon size={16} />
                      <p className="text-xs font-medium">{value}</p>
                    </div>
                  ))}
                </div>
                {accommodation.size ? (
                  <p className="text-base font-medium">
                    Room size <span className="font-light">{accommodation.size}m²</span>
                  </p>
                ) : null}
                <ul className="flex flex-col gap-1">
                  {accommodation.rooms.map((room, idx) => (
                    <li key={idx}>
                      <span className="text-xs font-medium">{room.name}: </span>
                      <span className="text-xs font-normal">
                        {room.furnitures.map((bed) => `${bed.count} ${bed.type}`).join(', ')}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs font-normal">{accommodation.description}</p>
                <div className="flex flex-wrap items-center gap-4">
                  {core.map(({ name, Icon }, idx) => (
                    <div key={idx} className="flex items-center gap-1 px-0 py-2 rounded-md">
                      <Icon color="black" size={16} />
                      <p className="text-xs font-medium">{name}</p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-2 pt-2">
                  {custom.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-1">
                      <IoCheckmark size={16} />
                      <p className="text-xs font-medium">{amenity}</p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-1">
                    <FaUserAlt size={16} />
                    {accommodation.maxGuests < 5 ? (
                      Array(accommodation.maxGuests - 1)
                        .fill(0)
                        .map((_, idx) => <FaUserAlt size={16} key={idx} />)
                    ) : (
                      <p className="text-bold text-sm capitalize">x{accommodation.maxGuests}</p>
                    )}
                  </div>
                  {reservationInfo.map(({ id, title, description }) => (
                    <li key={id} className="flex gap-2">
                      <IoCheckmark size={16} />
                      <div className="flex-1 flex flex-col gap-1">
                        <p className="text-xs font-semibold">{title}</p>
                        {description.length ? (
                          <ul className="flex flex-col gap-1">
                            {description.map((desc, idx) => (
                              <li key={idx} className="text-xs font-light">
                                - {desc}
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </div>
              </div>
            </div>
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AccommodationModal;
