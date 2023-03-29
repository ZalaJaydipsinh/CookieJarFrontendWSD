import React, { useEffect, useState } from "react";
import "./NewCourse.css";
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
import { CREATE_COURSE_RESET } from "../../constants/courseConstants";
import { useNavigate } from "react-router-dom";
import { clearErrors, createCourse } from "../../actions/courseAction.js";

const NewCourse = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, success } = useSelector((state) => state.newCourse);

  const [name, setName] = useState("");
  const [userId,setUserId] = useState(5);
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Course Created Successfully");
      history("/");
      dispatch({ type: CREATE_COURSE_RESET });
    }
  }, [dispatch, alert, error, history, success]);

  const createCourseSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("title", name);
    myForm.set("message", description);
    myForm.set("userId", userId);

    dispatch(createCourse(myForm));
  };

  return (
    <div>
      <Grid>
        <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto",backgroundColor: "rgb(234, 242, 248)",   borderRadius: "3%", marginTop: "2vh", boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px"}}>
          <CardContent>
            <Typography gutterBottom variant="h5">
              New Cookie Details
            </Typography>

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
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    size="large"
                    type="submit"
                    variant="contained"
                    fullWidth
                  >
                    Add Cookie into Jar
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

export default NewCourse;
