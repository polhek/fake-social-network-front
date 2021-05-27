import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { loginUser, logOut } from '../redux/userSlice';

interface Props {}

const fb_ID: string = process.env.REACT_APP_FB_ID as string;

const Login = (props: Props) => {
  const dispatch = useAppDispatch();

  const responseFacebook = (response: any) => {
    const access_token: string = response.accessToken;
    dispatch(loginUser(access_token));
  };

  const logOutFuncton = () => {
    dispatch(logOut());
  };

  return (
    <div className="flex justify-center ">
      <div className="bg-gray-800 mt-32 p-32 flex justify-center flex-col items-center text-lg rounded-xl shadow">
        <p>To login to the Odinbook, click the button bellow.</p>
        <FacebookLogin
          appId={fb_ID}
          autoLoad={false}
          fields="name,email,picture"
          callback={responseFacebook}
          cssClass="bg-blue-600 rounded p-3 hover:bg-blue-800 mt-4 "
        />
      </div>

      <button className="bg-red-700" onClick={logOutFuncton}>
        Clicl to logout test
      </button>
    </div>
  );
};

export default Login;
