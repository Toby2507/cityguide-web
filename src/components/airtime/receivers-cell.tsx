import { AirtimeNetworks, IAirtimeReceiver } from '@/types';
import etisalat from '@icons/9mobile.svg';
import airtel from '@icons/airtel.svg';
import glo from '@icons/glo.svg';
import mtn from '@icons/mtn.svg';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Image } from '@nextui-org/react';
import { HiOutlineDotsVertical } from 'react-icons/hi';

interface Props {
  columnKey: string;
  receiver: IAirtimeReceiver;
  editReceiver: (id: string) => void;
  deleteReceiver: (id: string) => void;
}

const RecieversCell = ({ columnKey, receiver, editReceiver, deleteReceiver }: Props) => {
  let networkIcon = airtel;
  if (receiver.network === AirtimeNetworks.MTN) networkIcon = mtn;
  if (receiver.network === AirtimeNetworks.GLO) networkIcon = glo;
  if (receiver.network === AirtimeNetworks.ETISALAT) networkIcon = etisalat;
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
            <DropdownItem onPress={() => editReceiver(receiver._id)}>Edit</DropdownItem>
            <DropdownItem onPress={() => deleteReceiver(receiver._id)}>Delete</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  return <div>RecieversCell</div>;
};

export default RecieversCell;
