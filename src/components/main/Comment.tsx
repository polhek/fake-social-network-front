import React from 'react';

interface Props {
  comments: any[];
  showHide: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Comment = ({ comments, showHide }: Props) => {
  return (
    <>
      <button onClick={showHide}>
        <p className="text-gray-400 hover:text-gray-500">
          {comments.length} comments
        </p>
      </button>
    </>
  );
};

export default Comment;
