import React from 'react';
import { TrashIcon } from '@heroicons/react/solid';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getAllUsers } from '../../redux/allUsersSlice';

interface Props {
  secondUser_id?: string;
}

const RemoveFriend = ({ secondUser_id }: Props) => {
  const dispatch = useAppDispatch();
  const loggedIn = useAppSelector((state) => state.user.loggedIn);

  const removeFriendRequest = async () => {
    try {
      const token = localStorage.getItem('token');

      if (token && loggedIn) {
        const response = await axios.delete(
          `/api/user/${secondUser_id}/remove-friend`,
          { headers: { Authorization: token } }
        );
        dispatch(getAllUsers(token));
        console.log('remove', response);
      }
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <>
      <button
        onClick={removeFriendRequest}
        className="bg-red-600 hover:bg-red-700 p-1 rounded flex items-center justify-center ml-2"
      >
        <TrashIcon className="text-white h-5 w-5" />
        <span>Remove friend</span>
      </button>
    </>
  );
};

export default RemoveFriend;
