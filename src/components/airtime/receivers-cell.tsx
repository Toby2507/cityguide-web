import { ISPs, IVtuReceiver } from '@/types';
import etisalat from '@icons/9mobile.svg';
import airtel from '@icons/airtel.svg';
import glo from '@icons/glo.svg';
import mtn from '@icons/mtn.svg';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Image } from '@nextui-org/react';
import { HiOutlineDotsVertical } from 'react-icons/hi';

interface Props {
  columnKey: string;
  receiver: IVtuReceiver;
  selectReceiver?: (id: string) => void;
  editReceiver?: (id: string) => void;
  deleteReceiver?: (id: string) => void;
}

const RecieversCell = ({ columnKey, receiver, editReceiver, deleteReceiver, selectReceiver }: Props) => {
  let networkIcon = airtel;
  if (receiver.network === ISPs.MTN) networkIcon = mtn;
  if (receiver.network === ISPs.GLO) networkIcon = glo;
  if (receiver.network === ISPs.ETISALAT) networkIcon = etisalat;
  if (columnKey === 'name')
    return (
      <div className="flex items-center gap-2">
        <Image
          src={networkIcon.src}
          width="full"
          height={networkIcon.height}
          alt={receiver.network}
          removeWrapper
          className="h-12 w-12"
        />
        <p className="text-base font-semibold">
          {receiver.firstName} {receiver.lastName}
        </p>
      </div>
    );
  if (columnKey === 'phone') return <p className="text-lg font-semibold">{receiver.phoneNumber}</p>;
  if (columnKey === 'action')
    return (
      <div className="flex justify-end">
        <Dropdown>
          <DropdownTrigger>
            <Button isIconOnly size="sm" variant="light">
              <HiOutlineDotsVertical className="text-accentGray text-xl" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu>
            {selectReceiver ? (
              <DropdownItem onPress={() => selectReceiver(receiver._id)}>Select</DropdownItem>
            ) : (
              <DropdownItem className="hidden" />
            )}
            {editReceiver ? (
              <DropdownItem onPress={() => editReceiver(receiver._id)}>Edit</DropdownItem>
            ) : (
              <DropdownItem className="hidden" />
            )}
            {deleteReceiver ? (
              <DropdownItem onPress={() => deleteReceiver(receiver._id)}>Delete</DropdownItem>
            ) : (
              <DropdownItem className="hidden" />
            )}
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  return <div>RecieversCell</div>;
};

export default RecieversCell;
