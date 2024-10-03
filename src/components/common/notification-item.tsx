import { INotification } from '@/types';
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';

dayjs.extend(calendar);
const NotificationItem = ({ title, message, createdAt, isRead }: INotification) => {
  return (
    <div className="flex gap-4">
      <div className={`${isRead ? 'bg-primary' : 'bg-default'} rounded-full h-3 w-3 mt-2`} />
      <div className="flex-1 flex flex-col gap-1">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="font-normal text-sm">{message}</p>
        <p className="font-normal text-xs text-accentGray">{dayjs(createdAt).calendar(dayjs())}</p>
      </div>
    </div>
  );
};

export default NotificationItem;
