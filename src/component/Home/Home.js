import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { clearErrors, getCourse } from "../../actions/courseAction";
import CourseCard from "../Course/courseCard";
import { alertClasses } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const Home = () => {
  const history = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  // const value = queryString.parse(window.location.search);
  const [keyword, setKeyword] = useState("");

  const { loading, courses, courseCount, error } = useSelector(
    (state) => state.courses
  );
  // const { loading: userLoading, isAuthenticated, user } = useSelector(
  //   (state) => state.user
  // );
  const [userId,setUserId] = useState(5);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    // if (!userLoading && !isAuthenticated) {
    //   history("/login");
    // }
    // console.log("keyword page....", value.keyword);
    // if (user) {
    //   dispatch(getCourse(userId));
    // }
    dispatch(getCourse(userId));

  }, [dispatch]);

  return (
    <>

      <MetaData title={"Course Tracker"} />
      {loading ? (
        <h1>waiting... ... ...</h1>
      ) : (
        courses &&
        courses.map((course) => <CourseCard key={course.id} course={course} />)
      )}
    </>
  );
};

export default Home;
