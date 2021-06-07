import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import Send from './Send';

interface Props {}

const SendFriend = (props: Props) => {
  const sendFriendRequests = useAppSelector(
    (state) => state.user.user?.friend_send
  );

  return (
    <div className="bg-gray-800 bg-opacity-90 m-2 rounded h-2/5 p-2 text-white shadow overflow-auto">
      <h3 className="font-bold mb-1 text-lg ">Sent friend requests:</h3>

      {sendFriendRequests &&
        sendFriendRequests.map((sendRequest) => {
          return <Send key={sendRequest._id} sendRequest={sendRequest} />;
        })}
      {!sendFriendRequests?.length && (
        <p className="text-red-500">You have no sent friend requests!</p>
      )}
    </div>
  );
};

export default SendFriend;
