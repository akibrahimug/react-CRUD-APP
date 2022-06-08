import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes} from 'react-router-dom';

import withContext from "./Context";
import UserSignUp from "./components/UserSignUp";
import UserSignIn from "./components/UserSignIn";
import Header from "./components/Header";


const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const HeaderWithContext = withContext(Header);


// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
  <Router>
    <div>
      <HeaderWithContext />
      <Routes>
        <Route path="/signup" element={<UserSignUpWithContext />} />
        <Route path="/signin" element={<UserSignInWithContext />} />
      </Routes>
    </div>
  </Router>
) 

