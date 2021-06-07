import React from 'react';
import AllUsers from './AllUsers';
import FriendList from './friends/FriendList';
import PostMain from './main/PostMain';
import PendingFriend from './pendingRequests/PendingFriend';
import SendFriend from './sendRequests/SendFriend';

interface Props {}

const Odinbook = (props: Props) => {
  return (
    <div className="w-full h-full flex  text-white">
      <div className=" w-1/4">
        <AllUsers />
        <FriendList />
      </div>
      <div className="w-2/4">
        <PostMain />
      </div>
      <div className="w-1/4">
        <PendingFriend />
        <SendFriend />
      </div>
    </div>
  );
};

export default Odinbook;
