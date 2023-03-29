import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import {
  clearErrors,
  getCourseDetails,
  updateTrack,
  getTrackDetails,
  deleteTrack,
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
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";

import DataSaverOnIcon from "@mui/icons-material/DataSaverOn";

const CourseDetails = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  let { id } = useParams();
  const alert = useAlert();
  const { loading, course, error } = useSelector(
    (state) => state.courseDetails
  );
  const { error: UpdateError, isUpdated, loading: UpdateLoading } = useSelector(
    (state) => state.track
  );
  const refresh = () => window.location.reload(true);

  const createCookieTagSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("tagId", tag);
    myForm.set("cookieId", id);

    dispatch(updateTrack(myForm));
    refresh();
  };

  const {
    loading: TrackDetailsLoading,
    track,
    error: TrackDetailsError,
  } = useSelector((state) => state.trackDetails);

  const [name, setName] = useState("");
  const [tag, setTag] = React.useState("");

  const handleChange = (event) => {
    setTag(event.target.value);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      // alert.success("Track updated Successfully");
      dispatch({ type: UPDATE_TRACK_RESET });
      dispatch({ type: TRACK_DETAILS_RESET });
      // history(`/course/${courseId}`);
    }
    console.log("course id: ", id);
    dispatch(getCourseDetails(id));

    if ((track && Object.keys(track).length === 0) || !track) {
      console.log("fetching tags....");
      dispatch(getTrackDetails(5));
    } else {
      console.log("tags are already fetched...");
    }
  }, [dispatch, isUpdated, error, history, track, alert]);

  return (
    <React.Fragment>
      {loading ? (
        <h1>waiting... ... ...</h1>
      ) : (
        <div className="outer">
          <Card
            className="card  cardLink"
            sx={{
              padding: "5px",
              backgroundColor: "rgb(234, 242, 248)",
              borderRadius: "1%",
              marginTop: "2vh",
              transition: "1s",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent sx={{ flex: "1 0 auto" }}>
                <div className="courseInfo">
                  <div
                    style={{
                      textOverflow: "ellipsis",
                      height: "2rem",
                    }}
                  >
                    <Typography component="div" variant="h5" nowrap>
                      {course.title}
                    </Typography>
                  </div>
                  <div
                    style={{
                      textOverflow: "ellipsis",
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      component="div"
                    >
                      {course.message}
                    </Typography>
                  </div>
                  <div
                    style={{
                      textOverflow: "ellipsis",
                      marginTop: "2vh",
                    }}
                  >
                    <Stack direction="row" spacing={1}>
                      {course &&
                        course.tags &&
                        course.tags.map((tag) => {
                          return (
                            <Chip
                              key={tag.id}
                              label={tag.name}
                              size="small"
                              variant="outlined"
                            />
                          );
                        })}
                    </Stack>
                  </div>
                  <br />
                  <div>
                    <form
                      onSubmit={createCookieTagSubmitHandler}
                      encType="multipart/form-data"
                    >
                      <FormControl sx={{ m: 1, minWidth: 80 }}>
                        <InputLabel id="demo-simple-select-autowidth-label">
                          Tag
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-autowidth-label"
                          id="demo-simple-select-autowidth"
                          value={tag}
                          onChange={handleChange}
                          autoWidth
                          label="All Tags"
                        >
                          <MenuItem value="">
                            <em>Tags</em>
                          </MenuItem>
                          {track &&
                            track.map((tag) => (
                              <MenuItem value={tag.id}>{tag.name}</MenuItem>
                            ))}
                        </Select>
                        <br />
                        {tag ? (
                          <Button
                            type="submit"
                            variant="outlined"
                            endIcon={<DataSaverOnIcon />}
                          >
                            Add
                          </Button>
                        ) : (
                          ""
                        )}
                      </FormControl>
                    </form>
                  </div>
                </div>
              </CardContent>
            </Box>
          </Card>
        </div>
      )}
    </React.Fragment>
  );
};

export default CourseDetails;
