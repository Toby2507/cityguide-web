'use client';

import { NotificationItem } from '@/components';
import { getNotifications, readNotifications } from '@/server';
import { Badge, Button, Popover, PopoverContent, PopoverTrigger, Spinner } from '@nextui-org/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import toast from 'react-hot-toast';
import { FaBell } from 'react-icons/fa6';

const Notification = () => {
  const { data: notifications, isPending } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => await getNotifications(),
    staleTime: 60 * 10 * 1000,
  });
  const queryClient = useQueryClient();
  const unreadNotifications = useMemo(() => notifications?.filter((n) => !n.isRead).map((n) => n._id), [notifications]);
  if (!notifications?.length || isPending) return null;

  const handleReadNotifications = async () => {
    if (!unreadNotifications?.length) return;
    try {
      await readNotifications(unreadNotifications);
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    } catch (err: any) {
      toast.error(err.message);
    }
  };
  const onOpenChange = (open: boolean) => {
    if (!open) handleReadNotifications();
  };
  return (
    <Popover offset={20} onOpenChange={onOpenChange} placement="bottom">
      <PopoverTrigger>
        <Button aria-label="notifications" isIconOnly radius="sm" variant="light">
          <Badge content="" size="sm" color="danger">
            <FaBell className="text-white" size={24} />
          </Badge>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        {(titleProps) => (
          <div className="flex flex-col max-w-xl h-[70vh] p-0">
            <div className="flex items-center justify-between border-b gap-32 p-2">
              <h1 className="text-xl font-semibold tracking-wide" {...titleProps}>
                Notifications
              </h1>
              <Button onPress={handleReadNotifications} color="primary" size="sm" variant="light">
                Mark all as read
              </Button>
            </div>
            <div className="flex-1 grid gap-2 px-2 py-4 overflow-auto">
              {isPending ? (
                <Spinner size="lg" />
              ) : (
                notifications.map((notification) => <NotificationItem key={notification._id} {...notification} />)
              )}
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default Notification;
