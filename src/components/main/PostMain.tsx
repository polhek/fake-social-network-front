import React from 'react';
import NewPost from './NewPost';
import PostList from './PostList';

interface Props {}

const PostMain = (props: Props) => {
  return (
    <div>
      <NewPost />
      <PostList />
    </div>
  );
};

export default PostMain;
