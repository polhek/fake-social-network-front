import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { loginUser, loginUserLocal } from '../redux/userSlice';

interface Props {
  history: any;
}

const fb_ID: string = process.env.REACT_APP_FB_ID as string;

const Login = (props: Props) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const dispatch = useAppDispatch();
  const loggedIn = useAppSelector((state) => state.user.loggedIn);

  const responseFacebook = async (response: any) => {
    const access_token: string = response.accessToken;
    localStorage.setItem('access_token', access_token);
    dispatch(loginUser(access_token));
  };

  const localLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = { email, password };
    dispatch(loginUserLocal(formData));
  };

  if (loggedIn) {
    return <Redirect to="/odinbook" />;
  }

  return (
    <div className="flex justify-center ">
      <div className="bg-gray-800 mt-32 p-32 mx-20 flex justify-center flex-col items-center text-lg rounded-xl shadow w-1/2">
        <p>To login to the Odinbook, click the button bellow.</p>
        <FacebookLogin
          appId={fb_ID}
          autoLoad={false}
          fields="name,email,picture"
          callback={responseFacebook}
          cssClass="bg-blue-600 rounded p-3 hover:bg-blue-800 mt-4 "
        />
        <span className="text-red-500 font-semibold">
          This is disabled, as for this to work facebook app needs to be in
          production or you need to be beta tester.
        </span>
      </div>
      <div className="w-1/2 mx-20 mt-32 bg-gray-800 rounded p-6 ">
        <p>You already registered? Log in bellow!</p>

        <h2 className="font-bold text-2xl my-5">Login</h2>

        <form onSubmit={localLogin}>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col">
              <label htmlFor="email">
                <b>Email</b>
              </label>
              <input
                className="p-2 rounded text-black"
                type="email"
                placeholder="Enter Email"
                name="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password">
                <b>Password</b>
              </label>
              <input
                className="p-2 rounded text-black"
                type="password"
                placeholder="Enter Password"
                name="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                required
              />
            </div>
            <div className="w-full mt-2">
              <button type="submit" className="w-full bg-blue-500 rounded p-2">
                Log in
              </button>{' '}
            </div>
          </div>
        </form>
        <div className="pt-5">
          <p>If not registered? Click bellow!</p>
          <Link to="/register">
            <button className="w-full bg-red-500 rounded p-2">Register</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
