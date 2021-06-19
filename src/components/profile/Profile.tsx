import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import Post from '../main/Post';
import ProfileMain from './ProfileMain';

interface Props {}

const Profile = (props: Props) => {
  const user = useAppSelector((state) => state.user.user);

  return (
    <div className="flex items-center flex-col mt-5">
      <div className="w-1/2">
        <ProfileMain />
      </div>
      {user &&
        user?.posts.map((post) => {
          console.log(post);
          return <Post key={post._id} post={post} />;
        })}

      {!user?.posts.length && <p>You have no posts!</p>}
    </div>
  );
};

export default Profile;
