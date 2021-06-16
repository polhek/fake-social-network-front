import React, { useEffect, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { PencilIcon, XIcon } from '@heroicons/react/solid';
import axios from 'axios';
import { useAppDispatch } from '../../redux/hooks';
import { updateUser } from '../../redux/userSlice';

interface Props {
  postId: string;
  userImg: string;
  closeModal: () => void;
}

const PostEdit = ({ postId, userImg, closeModal }: Props) => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState<boolean>(true);
  const token = localStorage.getItem('token');
  const dispatch = useAppDispatch();
  useEffect(() => {
    getPost();
  }, []);

  const getPost = async () => {
    try {
      if (token) {
        const singlePost = await axios.get(`api/posts/${postId}`, {
          headers: { Authorization: token },
        });

        const t: string = singlePost.data.post.text;
        console.log(singlePost.data.post);
        setText(t);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (token) {
        const editedPost = await axios.put(
          `api/posts/${postId}/update`,
          { text: text },
          {
            headers: { Authorization: token },
          }
        );
        if (editedPost) {
          closeModal();
          dispatch(updateUser(token));
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div className="bg-black h-full p-10 flex items-center justify-center ">
        <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-xl h-full p-10 flex flex-col text-white">
      <form onSubmit={submitHandler} className="flex-col w-full">
        <div className="flex justify-between items-center m-3">
          <h3 className="text-xl font-bold">Edit post:</h3>

          <button
            onClick={closeModal}
            className="p-1 bg-red-500 hover:bg-red-600 transform hover:scale-105 rounded-full"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="flex w-full">
          <img
            className="inline object-cover w-9 h-9  mr-2 rounded-full"
            src={userImg}
            alt="avatar"
          />
          <TextareaAutosize
            placeholder={`Write a comment ...`}
            className="w-full bg-gray-500 rounded-2xl p-1"
            onChange={(event) => {
              changeHandler(event);
            }}
            value={text}
            required
          />
        </div>
        <div className="flex justify-end m-2">
          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-800 transform hover:scale-105 flex items-center justify-center rounded p-2"
          >
            <p>Edit post</p>
            <PencilIcon className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostEdit;
