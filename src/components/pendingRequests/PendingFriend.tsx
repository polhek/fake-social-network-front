import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import PendingRequest from './PendingRequest';
import Loader from 'react-loader-spinner';

interface Props {}

const PendingFriend = (props: Props) => {
  const friendRequests = useAppSelector(
    (state) => state.user.user?.friend_requests
  );
  const loading = useAppSelector((state) => state.user.isFetching);
  return (
    <div className="bg-gray-800 bg-opacity-90 m-2 rounded h-2/5 p-2 text-white shadow overflow-auto">
      <h3 className="font-bold mb-1 text-lg ">Pending friend requests:</h3>
      {loading && (
        <div className="flex justify-center">
          <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
        </div>
      )}
      {!loading &&
        friendRequests &&
        friendRequests.map((request) => {
          return <PendingRequest key={request._id} request={request} />;
        })}
      {!loading && !friendRequests?.length && (
        <p className="text-red-500">You have no friends requests!</p>
      )}
    </div>
  );
};

export default PendingFriend;
