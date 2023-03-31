import "./App.css";
import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import Home from "./component/Home/Home.js";
import WebFont from "webfontloader";
import Appbar from "./component/layout/Appbar";
import CourseDetails from "./component/Course/courseDetails.js";
import LoginSignUp from "./component/User/LoginSignUp.js";
import UserOptions from "./component/layout/Header/UserOptions";
import NewCourse from "./component/Course/NewCourse";
import NewTrack from "./component/Course/NewTrack";
import UpdateCourse from "./component/Course/UpdateCourse";
import UpdateTrack from "./component/Course/UpdateTrack";
import store from "./store.js";
import { loadUser } from "./actions/userAction";
import { useSelector } from "react-redux";
import { useState } from "react";
import RandomCookie from "./component/Course/randomCourse";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  var uid;
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
    uid = localStorage.getItem("uid");
    console.log("user id: ",uid);
  }, [isAuthenticated]);
  return (
    <BrowserRouter>
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route path="/" element={<Appbar />}>
          <Route index element={<Home />} />
          <Route path="cookie/:id" element={<CourseDetails />} />
          <Route path="cookie/random" element={<RandomCookie />} />
          <Route path="Login/" element={<LoginSignUp />} />
          <Route
            path="cookie/new"
            element={isAuthenticated ? <NewCourse /> : <LoginSignUp />}
          />
          <Route path="tag/new" element={<NewTrack />} />
          <Route path="track/update" element={<UpdateTrack />} />
          <Route path="course/update/:id" element={<UpdateCourse />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
