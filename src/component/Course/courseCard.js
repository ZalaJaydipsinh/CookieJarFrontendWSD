import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { Link } from "react-router-dom";
import Progress from "./Progress";
import "./courseCard.css";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

export default function CourseCard({ course }) {
  return (
    <Card
      className="card  cardLink"
      sx={{
        maxWidth: 350,
        padding: "5px",
        backgroundColor: "rgb(234, 242, 248)",
        borderRadius: "1%",
        marginTop: "2vh",
        transition: "1s",
        maxHeight: 190,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Link to={`/cookie/${course.id}`} className="editBtn">
            <IconButton color="primary" aria-label="edit cookie">
              <AutoFixHighIcon />
            </IconButton>
          </Link>
          <div className="courseInfo">
            <div
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: "8rem",
                height: "2rem",
              }}
            >
              <Typography component="div" variant="h5" nowrap>
                {course.title}
              </Typography>
            </div>
            <div
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: "8rem",
                height: "7rem",
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
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: "8rem",
                height: "2rem",
              }}
            >
              <Stack direction="row" spacing={1}>
                {course &&
                  course.tags &&
                  course.tags.map((tag) => {
                    console.log("tag name: ");
                    console.log(tag.name);
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
          </div>
        </CardContent>
      </Box>
    </Card>
  );
}
