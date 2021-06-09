import React from 'react';
import timeFromPostTime from '../../helper';
import { updateUser, User } from '../../redux/userSlice';
import { ClockIcon, TrashIcon } from '@heroicons/react/solid';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import axios from 'axios';

interface Comment {
  _id: string;
  likes: any[];
  text: string;
  user: User;
  createdAt: string;
}

interface Props {
  comment: Comment;
  postId: string;
}

const CommentItem = ({ comment, postId }: Props) => {
  const user = useAppSelector((state) => state.user.user);
  const token = localStorage.getItem('token');
  const dispatch = useAppDispatch();
  const deleteComment = async () => {
    try {
      if (token) {
        await axios.delete(
          `api/post/${postId}/comment/${comment?._id}/delete`,
          {
            headers: { Authorization: token },
          }
        );
        dispatch(updateUser(token));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center  my-4">
      <img
        className="inline object-cover w-7 h-7  mr-2 rounded-full"
        src={comment?.user.profile_img_url}
        alt="avatar"
      />
      <div className="relative">
        <div className="bg-gray-600 p-2 rounded-2xl px-5">
          <h5 className="font-semibold">{`${comment.user.first_name} ${comment.user.last_name} `}</h5>
          <p className="text-sm">{comment?.text}</p>
        </div>
        <span className="absolute right-0 flex items-center text-gray-400">
          {timeFromPostTime(comment.createdAt)}
          <ClockIcon className="h-4 w-4" />
        </span>
      </div>
      {user?._id === comment.user._id ? (
        <button
          onClick={deleteComment}
          className="text-white bg-red-700 hover:bg-red-800 p-1  m-2 transform hover:scale-125 transition-all  rounded-full"
        >
          <TrashIcon className="h-4 w-4 " />
        </button>
      ) : null}
    </div>
  );
};

export default CommentItem;
