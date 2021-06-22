import React from 'react';
import { ThumbUpIcon } from '@heroicons/react/solid';

interface Props {
  likes: any[];
}

const Like = ({ likes }: Props) => {
  return (
    <>
      <button>
        <ThumbUpIcon className="h-5 w-5 hover:text-blue-400" />
      </button>
      <div className="bg-gray-700 rounded-full h-5 w-5 p-3 flex justify-center items-center">
        {likes.length}
      </div>
    </>
  );
};

export default Like;
