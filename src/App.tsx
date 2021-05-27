import React from 'react';
import Header from './components/Header';
import Login from './components/Login';

function App() {
  return (
    <div className=" h-full   text-white bg-gradient-to-br from-gray-600 via-teal-700 to-gray-800">
      <Header />
      <Login />
    </div>
  );
}

export default App;
