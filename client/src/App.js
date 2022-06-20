import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes} from 'react-router-dom';

import UserSignUp from "./components/UserSignUp";
import UserSignIn from "./components/UserSignIn";
import Header from "./components/Header";
import Courses from "./components/Courses";
import UserSignOut from "./components/UserSignOut";
import CourseDetail from "./components/CourseDetail";
import CreateCourse from "./components/CreateCourse";
import Authorised from "./components/Authorised";
import Error from "./components/Error";
import UpdateCourse from "./components/UpdateCourse";

function App (){
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Courses />} />
          <Route path="/signup" element={<UserSignUp />} />
          <Route path="/signin" element={<UserSignIn />} />
          <Route path="/signout" element={<UserSignOut />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/courses/create" element={<Authorised />}>
            <Route index element={<CreateCourse />} />
          </Route>
          <Route path="/courses/update/:id" element={<Authorised />}>
            <Route index element={<UpdateCourse />} />
          </Route>
          <Route path="/error" element={<Error />} />
        </Routes>
      </div>
    </Router>
  )
  
}

export default App;

