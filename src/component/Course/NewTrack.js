import React, { useEffect, useState } from "react";
import "./NewTrack.css";
import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";
import { CREATE_TRACK_RESET } from "../../constants/courseConstants";
import { useLocation, useNavigate } from "react-router-dom";
import {
  clearErrors,
  createTrack,
  deleteTrack,
  getTrackDetails,
} from "../../actions/courseAction.js";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DeleteIcon from "@mui/icons-material/Delete";

const NewTrack = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const alert = useAlert();
  const { loading, error, success } = useSelector((state) => state.newTrack);
  var uid = localStorage.getItem("uid");
  if (!uid) {
    console.log("user is not loged in.");
    history("/");
  }
  const [userId, setUserId] = useState(uid);
  // const [userId, setUserId] = useState(
  //   location ? location.state.user.id : ""
  // );

  const refresh = () => window.location.reload(true);

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
    // console.log("location");
    // console.log(location);

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Track added Successfully");
      dispatch({ type: CREATE_TRACK_RESET });
      // history(`/course/${userId}`);
    }
    if ((track && Object.keys(track).length === 0) || !track) {
      console.log("fetching tags....");
      var uid = localStorage.getItem("uid");
      if (uid) {
        dispatch(getTrackDetails(uid));
      } else {
        console.log("user is not loged in.");
        history("/");
      }
    } else {
      console.log("tags are already fetched...");
    }
  }, [dispatch, alert, error, history, success, track]);

  const createTrackSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    // setUserId(location.state.user.id);
    myForm.set("name", name);
    myForm.set("userId", userId);

    dispatch(createTrack(myForm));
    refresh();
  };

  return (
    <div className="track">
      <Grid>
        <Card
          style={{
            maxWidth: 450,
            padding: "20px 5px",
            margin: "0 auto",
            backgroundColor: "rgb(234, 242, 248)",
            borderRadius: "3%",
            marginTop: "2vh",
            boxShadow:
              "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
          }}
        >
          <CardContent>
            <Typography gutterBottom variant="h4">
              User Name
            </Typography>

            <Typography gutterBottom variant="h6">
              Enter new Tag Name
            </Typography>

            <form
              onSubmit={createTrackSubmitHandler}
              encType="multipart/form-data"
            >
              <Grid container spacing={1}>
                <Grid xs={12} item>
                  <TextField
                    label="Name"
                    variant="outlined"
                    placeholder="Enter track Name"
                    fullWidth
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    size="large"
                    type="submit"
                    variant="contained"
                    fullWidth
                  >
                    Add Tag
                  </Button>
                </Grid>
              </Grid>
            </form>
            <div>
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
                <Button
                  variant="outlined"
                  endIcon={<DeleteIcon />}
                  onClick={() => {
                    dispatch(deleteTrack(tag));
                    refresh();
                  }}
                >
                  Delete
                </Button>
              </FormControl>
            </div>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};

export default NewTrack;
