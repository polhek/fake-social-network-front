import React from 'react';
import { useAppSelector } from '../redux/hooks';

interface Props {}

const Header = (props: Props) => {
  const loggedIn = useAppSelector((state) => state.user.loggedIn);

  const user = useAppSelector((state) => state.user.user);

  return (
    <header className="flex flex-row justify-between items-center px-7 py-3 bg-gray-800">
      <h1 className="font-bold text-4xl">
        The <span className="text-red-600">Odin</span>book
      </h1>

      <div className="flex items-center justify-center">
        {!loggedIn && (
          <h2 className="font-bold text-xl text-red-600 ">
            No user is logged in!
          </h2>
        )}
        {loggedIn && (
          <>
            <img
              className="inline object-cover w-12 h-12 mr-2 rounded-full"
              src={user?.profile_img_url}
              alt="avatar"
            />
            <h2 className="font-bold text-xl ">{`${user?.first_name} ${user?.last_name}`}</h2>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
