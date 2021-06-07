import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import PendingRequest from './PendingRequest';
interface Props {}

const PendingFriend = (props: Props) => {
  const friendRequests = useAppSelector(
    (state) => state.user.user?.friend_requests
  );

  return (
    <div className="bg-gray-800 bg-opacity-90 m-2 rounded h-2/5 p-2 text-white shadow overflow-auto">
      <h3 className="font-bold mb-1 text-lg ">Pending friend requests:</h3>
      {friendRequests &&
        friendRequests.map((request) => {
          return <PendingRequest key={request._id} request={request} />;
        })}
      {!friendRequests?.length && (
        <p className="text-red-500">You have no friends requests!</p>
      )}
    </div>
  );
};

export default PendingFriend;
