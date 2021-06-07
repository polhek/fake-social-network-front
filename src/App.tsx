import React, { useEffect } from 'react';
import Header from './components/Header';
import Login from './components/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Odinbook from './components/Odinbook';
import { useAppSelector, useAppDispatch } from './redux/hooks';
import ProtectedRoute from './hoc/protectedRoute';
import { loginUser } from './redux/userSlice';

function App() {
  const loggedIn = useAppSelector((state) => state.user.loggedIn);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
      dispatch(loginUser(access_token));
    }
  }, []);

  return (
    <Router>
      <div className=" h-full text-white bg-gray-700">
        <Header />
        <Switch>
          <Route exact path="/" component={Login}></Route>
          <ProtectedRoute
            exact
            component={Odinbook}
            path="/odinbook"
            loggedIn={loggedIn}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
