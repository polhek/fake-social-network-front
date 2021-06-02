import React from 'react';
import AllUsers from './AllUsers';

interface Props {}

const Odinbook = (props: Props) => {
  return (
    <div className="w-full h-full flex  text-white">
      <div className=" w-1/4">
        <AllUsers />
      </div>
      <div className="bg-red-600 border w-2/4">ratata</div>
      <div className="bg-green-200 border w-1/4">raatata</div>
    </div>
  );
};

export default Odinbook;
