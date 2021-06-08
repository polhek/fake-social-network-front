import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { MailIcon } from '@heroicons/react/solid';
import axios from 'axios';
import { updateUser } from '../../redux/userSlice';
interface Props {}

const NewPost = (props: Props) => {
  const [text, setText] = useState<string>('initialState');
  const token = localStorage.getItem('token');
  const dispatch = useAppDispatch();

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (token && text.length > 0) {
        await axios.post(
          'api/posts/newPost',
          { text: text },
          { headers: { Authorization: token } }
        );
        dispatch(updateUser(token));
        setText('');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const user = useAppSelector((state) => state.user.user);
  return (
    <div className="bg-gray-800 m-2 rounded p-2 flex flex-col ">
      <form
        onSubmit={(event) => {
          submitHandler(event);
        }}
      >
        <div className="flex">
          <img
            className="inline object-cover w-9 h-9  mr-2 rounded-full"
            src={user?.profile_img_url}
            alt="avatar"
          />

          <input
            placeholder={`What are you thinking about, ${user?.first_name}`}
            className="w-full bg-gray-500 rounded-2xl p-1"
            value={text}
            onChange={(event) => {
              changeHandler(event);
            }}
            required
          />
        </div>
        <div className="pt-3 flex flex-start items-center">
          <button
            type="submit"
            className="bg-green-700 p-2 flex rounded items-center justify-items-center"
          >
            <MailIcon className="h-5 w-5 mr-2" />
            <span>Send Post</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPost;
