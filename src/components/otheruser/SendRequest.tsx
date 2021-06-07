import React from 'react';
import { MailIcon } from '@heroicons/react/solid';
import axios from 'axios';
import { useAppDispatch } from '../../redux/hooks';
import { updateUser } from '../../redux/userSlice';

interface Props {
  secondUser_id?: string;
  loggedUser_id?: string;
}

const SendRequest = ({ secondUser_id, loggedUser_id }: Props) => {
  const dispatch = useAppDispatch();

  const sendFriendRequest = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await axios.post(
          `/api/user/${secondUser_id?.toString()}/send-request`,
          null,
          {
            headers: { Authorization: token },
          }
        );
        dispatch(updateUser(token));
        console.log(response);
      }
    } catch (err) {
      console.log(err.response);
    }
  };
  return (
    <>
      <button
        onClick={sendFriendRequest}
        className="bg-green-600 hover:bg-green-700 p-1 rounded flex items-center justify-center ml-2"
      >
        <MailIcon className="text-white h-5 w-5" />
        <span>Send friend request</span>
      </button>
    </>
  );
};

export default SendRequest;
