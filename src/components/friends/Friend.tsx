import React from 'react';
import { User } from '../../redux/userSlice';
import RemoveFriend from '../otheruser/RemoveFriend';

interface Props {
  friend: User;
}

const Friend = ({ friend }: Props) => {
  return (
    <div className="bg-gray-900 rounded flex justify-between mt-2 p-2">
      <div className="flex items-center">
        <img
          className="inline object-cover w-8 h-8 rounded-full mr-2"
          src={friend?.profile_img_url}
          alt="avatar"
        />
        <p className="text-base">{`${friend?.first_name} ${friend?.last_name} `}</p>
      </div>
      <div>
        <RemoveFriend secondUser_id={friend?._id} />
      </div>
    </div>
  );
};

export default Friend;
