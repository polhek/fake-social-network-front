import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import NotificationItem from './NotificationItem';

interface Props {}

const Notification = (props: Props) => {
  const notifications = useAppSelector(
    (state) => state.user.user?.notifications
  );

  return (
    <div className="absolute bg-gray-500 w-96 h-96 overflow-auto rounded flex flex-col p-1 items-center">
      {notifications &&
        notifications?.map((item) => {
          return <NotificationItem key={item._id} notification={item} />;
        })}
    </div>
  );
};

export default Notification;
