import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import {
  clearErrors,
  getCourseDetails,
  updateTrack,
} from "../../actions/courseAction";
import Progress from "./Progress";
import { useParams } from "react-router-dom";
import CourseSpeedDial from "./CourseSpeedDial";
import { Link, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import {
  UPDATE_TRACK_RESET,
  TRACK_DETAILS_RESET,
} from "../../constants/courseConstants";
import Chip from "@mui/material/Chip";
import "./courseDetails.css";

const CourseDetails = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  let { id } = useParams();
  const alert = useAlert();
  const { loading, course, error } = useSelector(
    (state) => state.courseDetails
  );
  const {
    error: UpdateError,
    isUpdated,
    loading: UpdateLoading,
  } = useSelector((state) => state.track);


  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch({ type: TRACK_DETAILS_RESET });

    if (isUpdated) {
      // alert.success("Track updated Successfully");
      dispatch({ type: UPDATE_TRACK_RESET });
      dispatch({ type: TRACK_DETAILS_RESET });
      // history(`/course/${courseId}`);
    }

    dispatch(getCourseDetails(id));
  }, [dispatch, isUpdated]);

  function goToUpdateTrack(tid) {
    console.log("redirecting to update");
    history("/track/update", {
      state: { courseId: id, trackId: tid },
    });
  }

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 200,
      flex: 0.7,
    },
    {
      field: "notes",
      headerName: "Notes",
      width: 300,
      flex: 1,
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 110,
      renderCell: (params) => {
        return (
          <>
            <IconButton
              color="primary"
              onClick={() => goToUpdateTrack(params.row.id)}
            >
              <EditIcon />
            </IconButton>
          </>
        );
      },
      flex: 0.2,
    }
  ];

  const rows = [];

  course &&
    course.tracks &&
    course.tracks.forEach((item) => {
      rows.push({
        name: item.name,
        notes: item.notes,
        bookmark: item.bookmark,
        completed: item.done,
        hours: item.totalDuration.hours,
        minutes: item.totalDuration.minutes,
        id: item._id,
      });
    });

  return (
    <React.Fragment>
      {loading ? (
        <h1>waiting... ... ...</h1>
      ) : (
        <React.Fragment>
          <MetaData title={"Course Details"} />

          <div className="courseDetailDivCD">
            <div className="progressDivCD">
              <div className="trackProgress">
                <p className="progressInfo">
                  Track
                </p>
              </div>

              
            </div>
            <div className="courseInfoCD">
              <div
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  width: "8rem",
                  height: "2rem",
                }}
              >
                <Typography component="div" variant="h5" nowrap>
                  {course && course.name}
                </Typography>
              </div>
              <div
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  width: "60rem",
                  height: "7rem",
                }}
              >
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  component="div"
                >
                  {course && course.description}
                </Typography>
              </div>
            </div>
          </div>

          <br />
          <br />
          <div className="tableDivCD">
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={15}
              disableSelectionOnClick
              autoHeight
              sx={{ width: 1 }}
            />
          </div>
          <CourseSpeedDial courseId={id} courseName={course.name} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default CourseDetails;
