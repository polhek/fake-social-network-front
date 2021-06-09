import React, { useState } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { DateTime } from 'ts-luxon';
import {
  ClockIcon,
  DotsHorizontalIcon,
  ThumbUpIcon,
} from '@heroicons/react/solid';
import Like from './Like';
import Comment from './Comment';
import LikePost from './LikePost';
import CommentPost from './CommentPost';
import DeletePost from './DeletePost';
import Comments from './Comments';
import timeFromPostTime from '../../helper';

interface Props {
  post: any;
}

const Post = ({ post }: Props) => {
  const [showComments, setShowComments] = useState<boolean>(false);
  const img = post.user.profile_img_url;
  const user = useAppSelector((state) => state.user.user);

  const showHide = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="bg-gray-800 my-4 p-2 rounded">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img
            className="inline object-cover w-9 h-9  mr-2 rounded-full"
            src={post?.user.profile_img_url}
            alt="avatar"
          />
          <div>
            <p className="font-bold text-base">{post.user.first_name}</p>
            <p className="text-sm text-gray-100 flex items-center">
              {timeFromPostTime(post.createdAt)}
              <ClockIcon className="h-4 w-4" />
            </p>
          </div>
        </div>
        <div>
          <DotsHorizontalIcon className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-2 p-2 text-justify">{post.text}</div>
      <div className="flex justify-between items-center ">
        <div className="mt-2 p-2 flex items-center ">
          <Like likes={post.likes} />
        </div>
        <Comment showHide={showHide} comments={post.comments} />
      </div>
      <div className="flex justify-evenly p-2  text-gray-400 border-t-2 border-red-gray-200">
        <LikePost postId={post._id} />
        <CommentPost showHide={showHide} />
        {user && user._id === post.user._id ? (
          <DeletePost postId={post._id} />
        ) : null}
      </div>
      {showComments && (
        <Comments postId={post._id} allComments={post?.comments} />
      )}
    </div>
  );
};

export default Post;
