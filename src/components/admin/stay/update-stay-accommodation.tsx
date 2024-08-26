'use client';

import { IStay } from '@/types';
import { Button } from '@nextui-org/react';
import { useState } from 'react';
import { IoAdd } from 'react-icons/io5';
import UpdateStayAccommodationCreate from './update-stay-accommodation-create';
import UpdateStayAccommodationList from './update-stay-accommodation-list';
import UpdateStayAccommodationUpdate from './update-stay-accommodation-update';

interface Props {
  stay: IStay;
  onClose: () => void;
}
type modalState = 'list' | 'update' | 'create';

const UpdateStayAccommodation = ({ stay, onClose }: Props) => {
  const [modalState, setModalState] = useState<modalState>('list');
  const [accId, setAccId] = useState<string>('');
  const activeStay = stay.accommodation.find((a) => a.id === accId);

  const updateAccommodation = (id: string) => {
    setModalState('update');
    setAccId(id);
  };
  return (
    <div className="flex flex-col gap-6 p-2">
      <header className="flex items-center justify-between gap-4 border-b py-2">
        <h3 className="text-2xl text-center font-semibold tracking-wide">Update Stay Accommodations</h3>
        {modalState === 'list' ? (
          <Button
            color="primary"
            className="font-semibold"
            radius="sm"
            startContent={<IoAdd className="text-lg" />}
            variant="flat"
            onPress={() => setModalState('create')}
          >
            Add New Accommodation
          </Button>
        ) : null}
      </header>
      {modalState === 'list' ? <UpdateStayAccommodationList onUpdate={updateAccommodation} stay={stay} /> : null}
      {modalState === 'update' ? (
        <UpdateStayAccommodationUpdate accommodation={activeStay!} onClose={onClose} stayId={stay._id} />
      ) : null}
      {modalState === 'create' ? <UpdateStayAccommodationCreate onClose={onClose} stayId={stay._id} /> : null}
    </div>
  );
};

export default UpdateStayAccommodation;
