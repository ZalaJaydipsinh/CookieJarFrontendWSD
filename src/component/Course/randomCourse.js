import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import Stack from "@mui/material/Stack";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import "./courseCard.css";
import Chip from "@mui/material/Chip";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getRandomCourseDetails,
} from "../../actions/courseAction";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CourseCard from "../Course/courseCard";

export default function RandomCookie() {
  const alert = useAlert();

  const history = useNavigate();
  const dispatch = useDispatch();
  const { loading, course, error } = useSelector(
    (state) => state.courseDetails
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (!course || Object.keys(course).length === 0) {
      var uid = localStorage.getItem("uid");
      dispatch(getRandomCourseDetails(uid));
    }
  }, [dispatch, error, alert, course]);

  const handleRandomCookie = () => {
    var uid = localStorage.getItem("uid");
    dispatch(getRandomCourseDetails(uid));
  };

  return (
    <React.Fragment>
      {loading ? (
        <h1>waiting</h1>
      ) : (
        <div className="container">
          <div className="card-container">
            <CourseCard key={course.id} course={course} />
          </div>
          <br />
          <br />
          <div className="rand-btn">
            <Button
              size="small"
              onClick={handleRandomCookie}
              variant="contained"
              color="success"
            >
              Take another one
            </Button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
