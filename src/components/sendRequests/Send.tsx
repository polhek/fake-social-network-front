import React from 'react';
import { User } from '../../redux/userSlice';
import CancelRequest from '../otheruser/CancelRequest';

interface Props {
  sendRequest: User;
}

const Send = ({ sendRequest }: Props) => {
  return (
    <div className="bg-gray-900 rounded flex justify-between mt-2 p-2">
      <div className="flex items-center">
        <img
          className="inline object-cover w-8 h-8 rounded-full mr-2"
          src={sendRequest?.profile_img_url}
          alt="avatar"
        />
        <p className="text-base">{`${sendRequest?.first_name} ${sendRequest?.last_name} `}</p>
      </div>
      <div>
        <CancelRequest secondUser_id={sendRequest?._id} />
      </div>
    </div>
  );
};

export default Send;
