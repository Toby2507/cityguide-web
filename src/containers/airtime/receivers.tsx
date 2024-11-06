'use client';

import { AirtimeReceiverCell } from '@/components';
import { airtimeReceivers, airtimeReceiversColumns } from '@/data';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';

const AirtimeReceivers = () => {
  const receivers = airtimeReceivers;

  const onEdit = (id: string) => {
    console.log(id);
  };
  const onDelete = (id: string) => {
    console.log(id);
  };
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold">Saved Receivers</h2>
      <div className="bg-gray100 rounded-lg py-2">
        <div className="px-4 overflow-auto max-h-[45vh]">
          <Table
            removeWrapper
            hideHeader
            aria-label="Airtime Receivers"
            classNames={{ table: 'border-separate border-spacing-y-2' }}
          >
            <TableHeader columns={airtimeReceiversColumns}>
              {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody items={receivers}>
              {(item) => (
                <TableRow className="bg-white" key={item._id}>
                  {airtimeReceiversColumns.map(({ key }, idx) => (
                    <TableCell
                      key={key}
                      className={`bg-white${!idx ? ' rounded-l-xl' : ''}${idx === 2 ? ' rounded-r-xl' : ''}`}
                    >
                      <AirtimeReceiverCell
                        columnKey={key}
                        receiver={item}
                        editReceiver={onEdit}
                        deleteReceiver={onDelete}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
};

export default AirtimeReceivers;
