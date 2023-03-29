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
import { clearErrors, createTrack } from "../../actions/courseAction.js";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
const NewTrack = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const alert = useAlert();
  const { loading, error, success } = useSelector((state) => state.newTrack);
  // TODO: get the user id automatically.
  const [userId,setUserId] = useState(5);
  // const [userId, setUserId] = useState(
  //   location ? location.state.user.id : ""
  // );

  const [name, setName] = useState("");

  useEffect(() => {
    console.log("location");
    console.log(location);
    
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Track added Successfully");
      dispatch({ type: CREATE_TRACK_RESET });
      // history(`/course/${userId}`);
    }
  }, [dispatch, alert, error, history, success]);

  const createTrackSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    // setUserId(location.state.user.id);
    myForm.set("name", name);
    myForm.set("userId", userId);

    dispatch(createTrack(myForm));
  };

  return (
    <div className="track">
      <Grid>
        <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto",backgroundColor: "rgb(234, 242, 248)",   borderRadius: "3%", marginTop: "2vh", boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px"}}>
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
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};

export default NewTrack;
