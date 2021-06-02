import React from 'react';
import { XCircleIcon } from '@heroicons/react/solid';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getAllUsers } from '../../redux/allUsersSlice';

interface Props {
  secondUser_id?: string;
}

const CancelRequest = ({ secondUser_id }: Props) => {
  const dispatch = useAppDispatch();
  const loggedIn = useAppSelector((state) => state.user.loggedIn);

  const cancelFriendRequest = async () => {
    try {
      const token = localStorage.getItem('token');

      if (token && loggedIn) {
        const response = await axios.delete(
          `/api/user/${secondUser_id}/unsend-friend`,
          { headers: { Authorization: token } }
        );
        dispatch(getAllUsers(token));
        console.log('cancel', response);
      }
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <>
      <button
        onClick={cancelFriendRequest}
        className="bg-red-600 hover:bg-red-700 p-1 rounded flex items-center justify-center ml-2"
      >
        <XCircleIcon className="text-white h-5 w-5" />
        <span>Unsend Request</span>
      </button>
    </>
  );
};

export default CancelRequest;
