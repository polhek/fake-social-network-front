import React from 'react';
import { ChatAlt2Icon } from '@heroicons/react/solid';
interface Props {
  showHide: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const CommentPost = ({ showHide }: Props) => {
  return (
    <button
      onClick={showHide}
      className="flex items-center hover:bg-gray-700 hover:text-gray-500 px-20 py-2 rounded"
    >
      <ChatAlt2Icon className="h-5 w-5" />
      comments
    </button>
  );
};

export default CommentPost;
