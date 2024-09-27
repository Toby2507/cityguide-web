'use client';

import { getNotifications } from '@/server';
import { Badge, Button, Popover, PopoverContent, PopoverTrigger, Spinner } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { FaBell } from 'react-icons/fa6';

const Notification = () => {
  const { data: notifications, isPending } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => await getNotifications(),
    staleTime: 60 * 10 * 1000,
  });

  if (!notifications?.length || isPending) return null;
  console.log({ notifications });
  return (
    <Popover offset={20} placement="bottom">
      <PopoverTrigger>
        <Button aria-label="notifications" isIconOnly radius="sm" variant="light">
          <Badge content="" size="sm" color="danger">
            <FaBell className="text-white" size={24} />
          </Badge>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        {(titleProps) => (
          <div className="flex flex-col gap-2 max-w-7xl h-[70vh] p-0">
            <div className="flex items-center justify-between border-b gap-32 p-2">
              <h1 className="text-xl font-semibold tracking-wide">Notifications</h1>
              <Button color="primary" size="sm" variant="light">
                Mark all as read
              </Button>
            </div>
            <div className="flex-1 grid place-items-center gap-2 p-2 pb-4">
              {isPending ? <Spinner size="lg" /> : null}
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default Notification;
