import React from 'react';
import { useAppSelector } from '../redux/hooks';
import { LogoutIcon } from '@heroicons/react/solid';
import { useAppDispatch } from '../redux/hooks';
import { logOut } from '../redux/userSlice';

interface Props {}

const Header = (props: Props) => {
  const dispatch = useAppDispatch();
  const loggedIn = useAppSelector((state) => state.user.loggedIn);
  const user = useAppSelector((state) => state.user.user);

  const logOutFunction = () => {
    dispatch(logOut());
  };

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
            <button
              onClick={logOutFunction}
              className="bg-red-600 hover:bg-red-700 p-1 rounded flex items-center justify-center ml-2"
            >
              <LogoutIcon className="text-white h-5 w-5 mr-2" />
              <span>Log out</span>
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
