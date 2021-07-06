import React from 'react';
import { ThumbUpIcon } from '@heroicons/react/solid';
import axios from 'axios';
import { useAppDispatch } from '../../redux/hooks';
import { getAllPosts } from '../../redux/postsSlice';
import { updateUser } from '../../redux/userSlice';

interface Props {
  postId: string;
}

const LikePost = ({ postId }: Props) => {
  const token = localStorage.getItem('token');
  const dispatch = useAppDispatch();
  const likePost = async () => {
    try {
      if (token) {
        await axios.put(`/api/posts/${postId}/like`, null, {
          headers: { Authorization: token },
        });
        dispatch(updateUser(token));
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <button
      onClick={likePost}
      className="flex items-center hover:bg-gray-700 hover:text-gray-500 px-20 py-2 rounded"
    >
      <ThumbUpIcon className="h-5 w-5" />
      like
    </button>
  );
};

export default LikePost;
