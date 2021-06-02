import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import OtherUser from './OtherUser';
import { getAllUsers } from '../redux/allUsersSlice';

interface Props {}

const AllUsers = (props: Props) => {
  // const [users, setUsers] = useState<any[]>([]);
  const dispatch = useAppDispatch();
  const loggedIn = useAppSelector((state) => state.user.loggedIn);
  const allUsers = useAppSelector((state) => state.allUsers.allUsers);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (loggedIn && token) {
      dispatch(getAllUsers(token));
    }
    // getAllUsers();
  }, []);

  // const getAllUsers = async () => {
  //   try {
  //     const token = localStorage.getItem('token');
  //     if (token) {
  //       const response = await axios.get('/api/user/allUsers', {
  //         headers: { Authorization: token },
  //       });
  //       const allUsers = response.data.allUsers;
  //       setUsers(allUsers);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  return (
    <div className="bg-gray-800 bg-opacity-90 m-2 rounded h-2/5 p-2 text-white shadow overflow-auto">
      <h3 className="font-bold mb-1 text-lg ">All users:</h3>
      {allUsers &&
        allUsers.map((user) => {
          return <OtherUser key={user._id} user={user} />;
        })}
    </div>
  );
};

export default AllUsers;
