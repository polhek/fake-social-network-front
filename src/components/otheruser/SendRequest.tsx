import React from 'react';
import { MailIcon } from '@heroicons/react/solid';
import axios from 'axios';
import { getAllUsers } from '../../redux/allUsersSlice';
import { useAppDispatch } from '../../redux/hooks';

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
        dispatch(getAllUsers(token));
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
