import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import {
  clearErrors,
  getCourseDetails,
  updateTrack,
  getTrackDetails,
  deleteCookieTag,
  deleteCourse,
  updateCourse,
} from "../../actions/courseAction";
import { redirect, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import {
  UPDATE_TRACK_RESET,
  TRACK_DETAILS_RESET,
  DELETE_COURSE_RESET,
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
import { Grid, TextField } from "@mui/material";

const CourseDetails = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  //id - cookieId
  let { id } = useParams();
  const alert = useAlert();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
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

  const [tag, setTag] = React.useState("");

  const handleChange = (event) => {
    setTag(event.target.value);
  };
  var uid;
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
    if (!course || Object.keys(course).length === 0)
      dispatch(getCourseDetails(id));
    setName(course.title);
    setDescription(course.message);

    if ((track && Object.keys(track).length === 0) || !track) {
      // console.log("fetching tags....");
      uid = localStorage.getItem("uid");
      if (uid) {
        dispatch(getTrackDetails(uid));
      }
    }
  }, [dispatch, isUpdated, error, history, track, alert, course]);

  const handleDelete = (tagId) => {
    console.info("You clicked the delete icon: ", tagId);

    var deleteObj = {
      tagId: tagId,
      cookieId: parseInt(id),
    };

    dispatch(deleteCookieTag(deleteObj));

    refresh();
  };

  const handleCookieDelete = () => {
    dispatch(deleteCourse(id));
    alert.success("Course Deleted Successfully");
    dispatch({ type: DELETE_COURSE_RESET });
    history("/");
    refresh();
  };

  const createCourseSubmitHandler = (e) => {
    e.preventDefault();
    var updateCookie = {
      title: name,
      message: description,
      userId: parseInt(localStorage.getItem("uid")),
    };

    dispatch(updateCourse(id, updateCookie));
    refresh();
  };

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
                <IconButton
                  color="primary"
                  aria-label="edit cookie"
                  onClick={handleCookieDelete}
                >
                  <DeleteIcon />
                </IconButton>
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
                  <br />
                  <br />
                  <form
                    onSubmit={createCourseSubmitHandler}
                    encType="multipart/form-data"
                  >
                    <Grid container spacing={1}>
                      <Grid xs={12} item>
                        <TextField
                          label="Name"
                          variant="outlined"
                          placeholder="Enter course Name"
                          fullWidth
                          onChange={(e) => setName(e.target.value)}
                          required
                          value={name}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Message"
                          multiline
                          rows={4}
                          placeholder="Enter course Description"
                          variant="outlined"
                          onChange={(e) => setDescription(e.target.value)}
                          fullWidth
                          value={description}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <Button
                          size="large"
                          type="submit"
                          variant="contained"
                          fullWidth
                        >
                          Update Cookie
                        </Button>
                      </Grid>
                    </Grid>
                  </form>

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
                              onDelete={() => handleDelete(tag.id)}
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
