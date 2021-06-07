import React from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import axios from 'axios';
import Post from './Post';

interface Props {}

const PostList = (props: Props) => {
  const friendPosts = useAppSelector((state) => state.allPosts.allPosts);

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
