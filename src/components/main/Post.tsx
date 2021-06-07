import React from 'react';

interface Props {
  post: any;
}

const Post = ({ post }: Props) => {
  console.log(post);
  const img = post.user.profile_img_url;
  return (
    <div className="bg-gray-800 my-4 p-2 rounded">
      <div className="flex">
        <img
          className="inline object-cover w-9 h-9  mr-2 rounded-full"
          src={post?.user.profile_img_url}
          alt="avatar"
        />
        <div>
          <p className="font-bold">{post.user.first_name}</p>
          <p>{post?.createdAt}</p>
        </div>
      </div>
      <div>{post.text}</div>
    </div>
  );
};

export default Post;
