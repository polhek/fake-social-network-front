import React from 'react';
import { TrashIcon } from '@heroicons/react/solid';
interface Props {}

const DeletePost = (props: Props) => {
  return (
    <button className="flex items-center hover:bg-gray-700 hover:text-gray-500 px-20 py-3 rounded">
      <TrashIcon className="h-5 w-5" />
      delete
    </button>
  );
};

export default DeletePost;
