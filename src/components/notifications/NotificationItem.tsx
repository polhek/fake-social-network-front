import axios from 'axios';
import React, { useEffect } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { updateUser } from '../../redux/userSlice';

interface Props {
  notification: any;
}

const NotificationItem = ({ notification }: Props) => {
  const dispatch = useAppDispatch();
  const notificationStatus = notification.unread;
  const token = localStorage.getItem('token');
  const readNotification = () => {
    if (token) {
      axios.delete(`api/notification/${notification._id}/read`, {
        headers: { Authorization: token },
      });
      dispatch(updateUser(token));
    }
  };

  const whatToReturn = () => {
    if (notificationStatus) {
      return unread();
    } else {
      return read();
    }
  };

  const read = () => {
    return (
      <div
        onClick={readNotification}
        className="bg-gray-600 rounded w-full p-2 mx-2 my-1"
      >
        {notification.text}
        <span className="p-1 bg-blue-800 rounded mx-2">Read</span>
      </div>
    );
  };

  const unread = () => {
    return (
      <div
        onClick={readNotification}
        className="bg-gray-700 rounded w-full p-2 mx-2 my-1"
      >
        {notification.text}
        <span className="p-1 bg-red-800 rounded mx-2">Unread</span>
      </div>
    );
  };

  return <>{whatToReturn()}</>;
};

export default NotificationItem;
