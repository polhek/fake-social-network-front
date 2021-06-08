import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import TextareaAutosize from 'react-textarea-autosize';
import axios from 'axios';
import { updateUser } from '../../redux/userSlice';
interface Props {
  postId: string;
}

const NewComment = ({ postId }: Props) => {
  const [newComment, setNewComment] = useState<string>('');
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const token = localStorage.getItem('token');
  const changeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(event.target.value);
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (token && newComment.length > 0) {
        await axios.post(
          `api/post/${postId}/new-comment`,
          { text: newComment },
          { headers: { Authorization: token } }
        );
        dispatch(updateUser(token));
        setNewComment('');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={(event) => submitHandler(event)}>
      <div className="flex items-center ">
        <img
          className="inline object-cover w-9 h-9  mr-2 rounded-full"
          src={user?.profile_img_url}
          alt="avatar"
        />

        <TextareaAutosize
          placeholder={`Write a comment ...`}
          className="w-full bg-gray-500 rounded-2xl p-1"
          onChange={(event) => {
            changeHandler(event);
          }}
          value={newComment}
          required
        />
        <button
          type="submit"
          className="bg-blue-800 rounded hover:bg-blue-900 px-5"
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default NewComment;
