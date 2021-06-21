import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { MailIcon } from '@heroicons/react/solid';
import axios from 'axios';
import { updateUser } from '../../redux/userSlice';
import TextareaAutosize from 'react-textarea-autosize';

interface Props {}

const NewPost = (props: Props) => {
  const [text, setText] = useState<string>('');
  const token = localStorage.getItem('token');
  const [image, setImage] = useState<any>('');
  const dispatch = useAppDispatch();

  const changeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const postImageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    console.log(event.target.files);
    setImage(event.target.files[0]);
    console.log(image);
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (token && text.length > 0 && !image) {
        console.log('samo text');
        await axios.post(
          'api/posts/newPost',
          { text: text },
          { headers: { Authorization: token } }
        );
        dispatch(updateUser(token));
        setText('');
      }
      if (token && image && text.length > 0) {
        console.log('file');
        const data = new FormData();

        data.append('text', text);
        data.append('file', image);
        const upload = await axios.post('api/posts/newPost', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: token,
          },
        });
        console.log(upload);
        setText('');
        setImage('');
        dispatch(updateUser(token));
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

          <TextareaAutosize
            placeholder={`What are you thinking about, ${user?.first_name}`}
            className="w-full bg-gray-500 rounded-2xl p-1"
            onChange={(event) => {
              changeHandler(event);
            }}
            value={text}
            required
          />
        </div>
        <div className="pt-3 flex justify-between items-center">
          <button
            type="submit"
            className="bg-green-700 p-2 flex rounded items-center justify-items-center"
          >
            <MailIcon className="h-5 w-5 mr-2" />
            <span>Send Post</span>
          </button>
          <div>
            <input
              type="file"
              name="file"
              onChange={(event) => {
                postImageHandler(event);
              }}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewPost;
