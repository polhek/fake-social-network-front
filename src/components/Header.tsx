import React, { useState } from 'react';
import { useAppSelector } from '../redux/hooks';
import { LogoutIcon } from '@heroicons/react/solid';
import { useAppDispatch } from '../redux/hooks';
import { logOut } from '../redux/userSlice';
import { Link } from 'react-router-dom';
import { BellIcon } from '@heroicons/react/solid';
import Notification from './notifications/Notification';
interface Props {}

const Header = (props: Props) => {
  const dispatch = useAppDispatch();
  const loggedIn = useAppSelector((state) => state.user.loggedIn);
  const user = useAppSelector((state) => state.user.user);
  const [show, setShow] = useState(false);

  const logOutFunction = () => {
    dispatch(logOut());
  };

  const onlyUnreadCount = () => {
    const notification = user?.notifications;
    const unreadNotifications = notification?.filter(
      (item) => item.unread !== false
    );
    if (unreadNotifications) return unreadNotifications.length;
  };

  const clickHandler = () => {
    setShow(!show);
  };

  return (
    <header className="flex flex-row justify-between items-center px-7 py-3 bg-gray-800">
      <Link to="/odinbook">
        <h1 className="font-bold text-4xl">
          The <span className="text-red-600">Odin</span>book
        </h1>
      </Link>

      <div className="flex items-center justify-center space-x-5">
        {!loggedIn && (
          <h2 className="font-bold text-xl text-red-600 ">
            No user is logged in!
          </h2>
        )}
        {loggedIn && (
          <>
            <div className="relative">
              <div>
                <button onClick={clickHandler} className="flex items-center">
                  <BellIcon className="h-7 w-7 text-red-700" />
                  {onlyUnreadCount()}
                </button>
              </div>
              {show && <Notification />}
            </div>

            <Link to="/profile">
              <span className="font-semibold text-xl px-4 py-2 hov border-2 hover:bg-red-500 transform hover:scale-105 border-red-500 ">
                Profile
              </span>
            </Link>

            <div className="flex items-center">
              <img
                className="inline object-cover w-12 h-12 mr-2 rounded-full"
                src={user?.profile_img_url}
                alt="avatar"
              />
              <h2 className="font-bold text-xl ">{`${user?.first_name} ${user?.last_name}`}</h2>
            </div>

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
