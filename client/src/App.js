import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes} from 'react-router-dom';

import UserSignUp from "./components/UserSignUp";
import UserSignIn from "./components/UserSignIn";
import Header from "./components/Header";
import Courses from "./components/Courses";
import './styles/global.css'
import './styles/reset.css'

function App (){
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/signup" element={<UserSignUp />} />
          <Route path="/signin" element={<UserSignIn />} />
          <Route path="/" element={<Courses />} />
        </Routes>
      </div>
    </Router>
  )
  
}

export default App;

