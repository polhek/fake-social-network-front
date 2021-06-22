import React, { useState } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { ClockIcon, DotsVerticalIcon } from '@heroicons/react/solid';
import Like from './Like';
import Comment from './Comment';
import LikePost from './LikePost';
import CommentPost from './CommentPost';
import DeletePost from './DeletePost';
import Comments from './Comments';
import timeFromPostTime from '../../helper';
import Modal from 'react-modal';
import PostEdit from './PostEdit';

Modal.setAppElement('#root');

interface Props {
  post: any;
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: 0,
    width: '60%',
    height: '65%',
    borderRadius: '0.75rem',
  },
};

const Post = ({ post }: Props) => {
  const [showComments, setShowComments] = useState<boolean>(false);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const img = post.user.profile_img_url;
  const user = useAppSelector((state) => state.user.user);

  const showHide = () => {
    setShowComments(!showComments);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
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
          <button
            onClick={openModal}
            className="flex items-center font-semibold text-gray-400 hover:text-gray-500"
          >
            Edit
            <DotsVerticalIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="mt-2 p-2 text-justify">{post.text}</div>
      {post.image_url && (
        <div className="flex justify-center">
          <img
            className="rounded-lg border-black border-2 h-96 w-96"
            src={post.image_url}
            alt="post"
          ></img>
        </div>
      )}
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

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel={'Example modal'}
      >
        <PostEdit
          postId={post._id}
          userImg={post?.user.profile_img_url}
          closeModal={closeModal}
        />
      </Modal>
    </div>
  );
};

export default Post;
