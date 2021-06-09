import React from 'react';
import { TrashIcon } from '@heroicons/react/solid';
import axios from 'axios';
import { useAppDispatch } from '../../redux/hooks';
import { updateUser } from '../../redux/userSlice';
interface Props {
  postId: string;
}

const DeletePost = ({ postId }: Props) => {
  const token = localStorage.getItem('token');
  const dispatch = useAppDispatch();
  const deletePost = async () => {
    try {
      if (token) {
        await axios.delete(`api/posts/${postId}/remove`, {
          headers: { Authorization: token },
        });
        dispatch(updateUser(token));
      }
    } catch (error) {}
  };

  return (
    <button
      onClick={deletePost}
      className="flex items-center hover:bg-gray-700 hover:text-gray-500 px-20 py-3 rounded"
    >
      <TrashIcon className="h-5 w-5" />
      delete
    </button>
  );
};

export default DeletePost;
