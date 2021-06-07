import React from 'react';
import ReplyRequest from '../otheruser/ReplyRequest';
import { User } from '../../redux/userSlice';

interface Props {
  request?: User;
}

const PendingRequest = ({ request }: Props) => {
  console.log(request);
  return (
    <div className="bg-gray-900 rounded flex justify-between mt-2 p-2">
      <div className="flex items-center">
        <img
          className="inline object-cover w-8 h-8 rounded-full mr-2"
          src={request?.profile_img_url}
          alt="avatar"
        />
        <p className="text-base">{`${request?.first_name} ${request?.last_name} `}</p>
      </div>
      <div>
        <ReplyRequest secondUser_id={request?._id} />
      </div>
    </div>
  );
};

export default PendingRequest;
