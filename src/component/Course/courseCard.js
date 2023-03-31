import * as React from "react";
import Stack from "@mui/material/Stack";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import CardActions from "@mui/material/CardActions";
import "./courseCard.css";
import Chip from "@mui/material/Chip";

export default function CourseCard({ course }) {
  return (
    <Card
      className="card"
      sx={{
        width: 350,
        padding: "5px",
        backgroundColor: "rgb(234, 242, 248)",
        borderRadius: "1%",
        transition: "1s",
        height: 190,
        position: "relative",
      }}
    >
      <CardContent>
        <Stack
          direction="column"
          justifyContent="space-around"
          alignItems="flex-start"
          spacing={1}
        >
          <Typography
            component="div"
            variant="h5"
            sx={{
              whiteSpace: "nowrap",
            }}
          >
            {course.title}
          </Typography>

          <Typography
            variant="subtitle2"
            color="text.secondary"
            component="div"
            sx={{
              whiteSpace: "normal",
            }}
          >
            {course.message}
          </Typography>

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
        </Stack>
      </CardContent>
      <CardActions
        className="card-action"
      >
        <Link to={`/cookie/${course.id}`}>
          <IconButton color="primary" aria-label="edit cookie">
            <AutoFixHighIcon />
          </IconButton>
        </Link>
      </CardActions>
    </Card>
  );
}
