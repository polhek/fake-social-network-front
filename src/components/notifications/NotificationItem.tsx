import React from 'react';

interface Props {
  notification: any;
}

const NotificationItem = ({ notification }: Props) => {
  return (
    <div className="bg-gray-900 rounded w-full p-2 mx-2 my-1">
      {notification.text}
    </div>
  );
};

export default NotificationItem;
