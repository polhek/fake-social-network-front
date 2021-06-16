import React from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import axios from 'axios';
import Post from './Post';
import Loader from 'react-loader-spinner';

interface Props {}

const PostList = (props: Props) => {
  const friendPosts = useAppSelector((state) => state.allPosts.allPosts);
  const loading = useAppSelector((state) => state.allPosts.isFetching);

  if (loading) {
    return (
      <div className="flex justify-center">
        <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
      </div>
    );
  }

  return (
    <>
      {friendPosts &&
        friendPosts.map((post) => {
          return <Post key={post._id} post={post} />;
        })}
    </>
  );
};

export default PostList;
