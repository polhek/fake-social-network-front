import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import Friend from './Friend';

interface Props {}

const FriendList = (props: Props) => {
  const friendList = useAppSelector((state) => state.user.user?.friends);
  return (
    <div className="bg-gray-800 bg-opacity-90 m-2 rounded h-2/5 p-2 text-white shadow overflow-scroll">
      <h3 className="font-bold mb-1 text-lg ">Friends:</h3>

      {friendList &&
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
