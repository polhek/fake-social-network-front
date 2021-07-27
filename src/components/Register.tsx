import axios from 'axios';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

interface Props {}

const Register = (props: Props) => {
  const [first_name, setFirst_name] = useState<string>('');
  const [last_name, setLast_name] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [redirect, setRedirect] = useState<boolean>(false);
  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data = await axios.post(`api/user/register`, {
        first_name,
        last_name,
        email,
        password,
      });
      console.log(data);
      setRedirect(!redirect);
    } catch (error) {
      setError(error.response.data.msg);
    }
  };

  if (redirect) {
    return <Redirect to="/" />;
  }
  return (
    <div className="flex justify-center w-screen">
      <div className="bg-gray-800 mt-32 w-1/2 h-auto rounded shadow p-5">
        <h2 className="font-bold text-2xl my-5">Register</h2>
        <form
          onSubmit={(event) => {
            submitHandler(event);
          }}
        >
          <div className="flex flex-col gap-2">
            <div className="flex flex-col">
              <label htmlFor="first_name">
                <b>First Name</b>
              </label>
              <input
                className="p-2 rounded text-black"
                type="text"
                placeholder="Enter First Name"
                name="first_name"
                value={first_name}
                onChange={(event) => {
                  setFirst_name(event.target.value);
                }}
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="last_name">
                <b>Last Name</b>
              </label>
              <input
                className="p-2 rounded text-black"
                type="text"
                placeholder="Enter Last Name"
                name="last_name"
                value={last_name}
                onChange={(event) => {
                  setLast_name(event.target.value);
                }}
                required
              />
            </div>
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
            {error && <span className="text-red-500">{error}</span>}
            <div className="w-full mt-2">
              <button
                type="submit"
                className="w-full bg-blue-500 rounded p-2 font-semibold"
              >
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
