import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { clearErrors, getCourse } from "../../actions/courseAction";
import CourseCard from "../Course/courseCard";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const history = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  // const value = queryString.parse(window.location.search);
  const [keyword, setKeyword] = useState("");

  const { loading, courses, error } = useSelector((state) => state.courses);
  // const { loading: userLoading, isAuthenticated, user } = useSelector(
  //   (state) => state.user
  // );
  var uid = localStorage.getItem("uid");
  if (!uid) {
    console.log("user is not loged in.");
  }
  const [userId, setUserId] = useState(uid);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    var uid = localStorage.getItem("uid");
    if (!uid) {
      history("/login");
    }
    setUserId(uid);
    dispatch(getCourse(userId));
  }, [dispatch]);

  return (
    <>
      <MetaData title={"Cookie Jar"} />
      {loading ? (
        <h1>waiting... ... ...</h1>
      ) : (
        <div className="card-container">
          {courses &&
            courses.map((course) => (
              <div className="cookie-card">
              <CourseCard key={course.id} course={course} />
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default Home;
