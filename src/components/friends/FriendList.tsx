import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import Friend from './Friend';
import Loader from 'react-loader-spinner';

interface Props {}

const FriendList = (props: Props) => {
  const friendList = useAppSelector((state) => state.user.user?.friends);
  const loading = useAppSelector((state) => state.user.isFetching);
  return (
    <div className="bg-gray-800 bg-opacity-90 m-2 rounded h-2/5 p-2 text-white shadow overflow-scroll">
      <h3 className="font-bold mb-1 text-lg ">Friends:</h3>
      {loading && (
        <div className="flex justify-center">
          <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
        </div>
      )}
      {!loading &&
        friendList &&
        friendList.map((friend) => {
          return <Friend key={friend._id} friend={friend} />;
        })}
      {!friendList?.length && (
        <p className="text-red-500">You have no friends!</p>
      )}
    </div>
  );
};

export default FriendList;
