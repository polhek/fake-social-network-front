import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import OtherUser from './OtherUser';
import { getAllUsers } from '../redux/allUsersSlice';
import { getAllPosts } from '../redux/postsSlice';
import Loader from 'react-loader-spinner';

interface Props {}

const AllUsers = (props: Props) => {
  // const [users, setUsers] = useState<any[]>([]);
  const dispatch = useAppDispatch();
  const loggedUser = useAppSelector((state) => state.user.user);
  const loggedIn = useAppSelector((state) => state.user.loggedIn);
  const allUsers = useAppSelector((state) => state.allUsers.allUsers);
  const token = localStorage.getItem('token');
  const loading = useAppSelector((state) => state.allUsers.isFetching);

  useEffect(() => {
    if (loggedIn && token) {
      dispatch(getAllUsers(token));
      dispatch(getAllPosts(token));
    }
  }, [loggedUser]);

  return (
    <div className="bg-gray-800 bg-opacity-90 m-2 rounded h-2/5 p-2 text-white shadow overflow-auto">
      <h3 className="font-bold mb-1 text-lg ">All users:</h3>
      {loading && (
        <div className="flex justify-center">
          <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
        </div>
      )}
      {!loading &&
        allUsers &&
        allUsers.map((user) => {
          return <OtherUser key={user._id} user={user} />;
        })}
    </div>
  );
};

export default AllUsers;
