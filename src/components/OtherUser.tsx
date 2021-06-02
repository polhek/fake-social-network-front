import React from 'react';
import { User } from '../redux/userSlice';
import { useAppSelector } from '../redux/hooks';
import SendRequest from './otheruser/SendRequest';
import CancelRequest from './otheruser/CancelRequest';
import RemoveFriend from './otheruser/RemoveFriend';
import ReplyRequest from './otheruser/ReplyRequest';

interface Props {
  user?: User;
}

const OtherUser = ({ user }: Props) => {
  const loggedUser = useAppSelector((state) => state.user.user);
  const id = loggedUser?._id;

  return (
    <div className="bg-gray-900 rounded flex justify-between mt-2 p-2">
      <div className="flex items-center">
        <img
          className="inline object-cover w-8 h-8 rounded-full mr-2"
          src={user?.profile_img_url}
          alt="avatar"
        />
        <p className="text-base">{`${user?.first_name} ${user?.last_name} `}</p>
      </div>
      <div>
        {user?.friends.includes(id) && (
          <RemoveFriend secondUser_id={user?._id} />
        )}

        {!user?.friend_requests.includes(id) &&
          !user?.friend_send.includes(id) &&
          !user?.friends.includes(id) && (
            <SendRequest
              secondUser_id={user?._id}
              loggedUser_id={loggedUser?._id}
            />
          )}

        {user?.friend_send.includes(id) && (
          <ReplyRequest secondUser_id={user?._id} />
        )}

        {user?.friend_requests.includes(id) && (
          <CancelRequest secondUser_id={user?._id} />
        )}
      </div>
    </div>
  );
};

export default OtherUser;
