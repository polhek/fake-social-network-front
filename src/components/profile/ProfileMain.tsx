import React, { useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import axios from 'axios';

import { updateUser } from '../../redux/userSlice';

interface Props {}

const ProfileMain = (props: Props) => {
  const user = useAppSelector((state) => state.user.user);
  const [profileImage, setProfileImage] = useState<any>('');
  const token = localStorage.getItem('token');
  const ref = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    console.log(event.target.files);
    setProfileImage(event.target.files[0]);
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (token) {
      const data = new FormData();
      data.append('file', profileImage);
      console.log(data);
      await axios.post('api/user/updateProfilePicture', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token,
        },
      });
      if (ref.current) {
        ref.current.value = '';
      }
      dispatch(updateUser(token));
    }
  };
  return (
    <div className="flex justify-center bg-gray-800 rounded">
      <div className="flex flex-col items-center p-5">
        <img
          className="inline object-cover w-40 h-40 mr-2 rounded-full border-4 border-black"
          src={user?.profile_img_url}
          alt="avatar"
        />
        <h2 className="font-bold text-3xl  ">{`${user?.first_name} ${user?.last_name}`}</h2>
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <div className="flex flex-col border-2 bg-gray-900 p-4 gap-3 rounded">
            <div className="flex justify-center flex-col items-center">
              <label className="font-bold text-xl">
                If you want to change profile picture click bellow
              </label>
              <input
                type="file"
                name="file"
                onChange={(event) => {
                  onChangeHandler(event);
                }}
                ref={ref}
              />
            </div>

            <button type="submit" className="bg-green-500 rounded  ">
              Upload file
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileMain;
