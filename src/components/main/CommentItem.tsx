import React from 'react';
import { User } from '../../redux/userSlice';

interface Comment {
  likes: any[];
  text: string;
  user: User;
  createdAt: string;
}

interface Props {
  comment: Comment;
}

const CommentItem = ({ comment }: Props) => {
  console.log(comment);
  return <div>{comment?.text}</div>;
};

export default CommentItem;
