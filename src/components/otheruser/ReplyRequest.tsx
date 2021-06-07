import React from 'react';
import { CheckCircleIcon, TrashIcon } from '@heroicons/react/solid';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { updateUser } from '../../redux/userSlice';

interface Props {
  secondUser_id?: string;
}

const ReplyRequest = ({ secondUser_id }: Props) => {
  const dispatch = useAppDispatch();
  const loggedIn = useAppSelector((state) => state.user.loggedIn);

  const cancelFriend = async () => {
    try {
      const token = localStorage.getItem('token');

      if (token && loggedIn) {
        const response = await axios.delete(
          `/api/user/${secondUser_id}/cancel-friend`,
          { headers: { Authorization: token } }
        );
        console.log('cancel', response);
        dispatch(updateUser(token));
      }
    } catch (err) {
      console.log(err.response);
    }
  };

  const acceptFriend = async () => {
    try {
      const token = localStorage.getItem('token');

      if (token && loggedIn) {
        const response = await axios.put(
          `/api/user/${secondUser_id}/accept-friend`,
          null,
          { headers: { Authorization: token } }
        );

        dispatch(updateUser(token));
        console.log('cancel', response);
      }
    } catch (err) {
      console.log(err.response);
    }
  };
  return (
    <>
      <button
        onClick={acceptFriend}
        className="bg-blue-600 hover:bg-blue-700 p-1 rounded flex items-center justify-center ml-2"
      >
        <CheckCircleIcon className="text-white h-5 w-5" />
        <span>Accept</span>
      </button>
      <button
        onClick={cancelFriend}
        className="bg-red-600 hover:bg-red-700 p-1 rounded flex items-center justify-center ml-2"
      >
        <TrashIcon className="text-white h-5 w-5" />
        <span>Cancel</span>
      </button>
    </>
  );
};

export default ReplyRequest;
