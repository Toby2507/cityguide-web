'use client';

import { IVtuTransaction, VTUStatus } from '@/types';
import { numberToCurrency } from '@/utils';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Modal,
  ModalContent,
  useDisclosure,
} from '@nextui-org/react';
import { GoArrowDownRight, GoArrowUpRight } from 'react-icons/go';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { VTUTransactionDetail } from '..';
import { useState } from 'react';

interface Props {
  columnKey: string;
  transaction: IVtuTransaction;
}

const TransactionCell = ({ columnKey, transaction }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [detailsInitial, setDetailsInitial] = useState<'status' | 'details'>('status');
  const viewStatus = () => {
    setDetailsInitial('status');
    onOpen();
  };
  const viewDetails = () => {
    setDetailsInitial('details');
    onOpen();
  };
  let statusColor: 'secondary' | 'default' | 'warning' | 'danger' | 'primary' | 'success' | undefined = 'secondary';
  if (transaction.status === VTUStatus.IN_PROGRESS) statusColor = 'warning';
  if (transaction.status === VTUStatus.FAILED) statusColor = 'danger';
  if (columnKey === 'status')
    return (
      <div className="flex items-center gap-1">
        <div className={`w-1 h-1 rounded-full bg-${statusColor}`} />
        <p className={`text-base font-medium text-right text-${statusColor}`}>{transaction.status}</p>
      </div>
    );
  if (columnKey === 'amount') return <p className="text-xl font-semibold">{numberToCurrency(transaction.amount)}</p>;
  if (columnKey === 'recipient')
    return (
      <div className="flex items-center gap-2">
        <Button isIconOnly aria-label="User" isDisabled size="lg" color={statusColor} variant="flat">
          {transaction.status === VTUStatus.FAILED ? <GoArrowDownRight size={20} /> : <GoArrowUpRight size={20} />}
        </Button>
        <div className="flex flex-col justify-center">
          <p className="text-xs text-accentGray font-medium">Sent to</p>
          <p className="text-xl font-semibold">
            {transaction.firstName} {transaction.lastName}
          </p>
        </div>
      </div>
    );
  if (columnKey === 'action')
    return (
      <>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => <VTUTransactionDetail id={transaction._id} initial={detailsInitial} onClose={onClose} />}
          </ModalContent>
        </Modal>
        <div className="flex justify-end">
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly size="sm" variant="light">
                <HiOutlineDotsVertical className="text-accentGray text-xl" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem onPress={viewStatus}>View Status</DropdownItem>
              <DropdownItem onPress={viewDetails}>View Details</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </>
    );
  return <div>TransactionCell</div>;
};

export default TransactionCell;
