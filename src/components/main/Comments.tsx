import React from 'react';
import CommentItem from './CommentItem';
import NewComment from './NewComment';

interface Props {
  allComments: any[];
  postId: string;
}

const Comments = ({ allComments, postId }: Props) => {
  return (
    <div className="flex flex-col border-t-2 border-red-gray-200 mt-2 p-3">
      <NewComment postId={postId} />
      {allComments &&
        allComments.map((comment) => {
          return (
            <CommentItem key={comment._id} comment={comment} postId={postId} />
          );
        })}
    </div>
  );
};

export default Comments;
