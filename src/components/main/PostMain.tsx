import React from 'react';
import NewPost from './NewPost';
import PostList from './PostList';

interface Props {}

const PostMain = (props: Props) => {
  return (
    <div className="overflow-scroll h-full">
      <NewPost />
      <PostList />
    </div>
  );
};

export default PostMain;
