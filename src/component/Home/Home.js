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
  const { loading: userLoading, isAuthenticated,user } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (!userLoading && !isAuthenticated) {
      history("/login");
    }
    // console.log("keyword page....", value.keyword);

    dispatch(getCourse(user.id));
  }, [dispatch, userLoading, isAuthenticated,user]);

  const searchHandle = () => {
    
    dispatch(getCourse(user.id));
  };

  return (
    <>
      <div className="searchDiv">
        <TextField
          size="small"
          value={keyword}
          onInput={(e) => setKeyword(e.target.value)}
          variant="filled"
        />
        <Button
          className="searchBtn"
          variant="outlined"
          color="success"
          sx={{ marginLeft: "1rem" }}
          onClick={searchHandle}
        >
          Search
        </Button>
      </div>
      <MetaData title={"Course Tracker"} />
      {loading ? <h1>waiting... ... ...</h1> : <h1>Done... ... ...</h1>}
    </>
  );
};

export default Home;
