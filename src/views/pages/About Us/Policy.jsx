import {
  Box,
  Container,
  Paper,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  mainBox: {
    "& .hedingBox": {
      "& h2": {
        color: "#3D3D3D",
        fontSize: "30px",
        fontWeight: "500",
      },
    },
    "& .contentBox": {
      marginTop: "10px",
      "& p": {
        color: "#000000a1",
        fontSize: "16px",
        fontWeight: "300",
      },
    },
    "& p": {
      color: "#000000a1",
      fontSize: "16px",
      fontWeight: "300",
    },
    "& ul": {
      marginLeft: "-25px",
    },
    "& li": {
      color: "#000000a1",
      fontSize: "16px",
      fontWeight: "300",
      marginBottom: "10px",
      lineHeight: "30px",
    },
  },
}));

const Policy = () => {
  const classes = useStyles();
  return (
    <>
      <Paper elevation={2} style={{ padding: "20px" }}>
        <Box className={classes.mainBox}>
          <Box className="hedingBox">
            <Typography variant="h2">Privacy Policy</Typography>
          </Box>
          <Box className="contentBox">
            <Typography variant="body2">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English.
            </Typography>
            <Typography variant="body2" style={{ marginTop: "16px" }}>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English.
            </Typography>
            <Typography variant="body2" style={{ marginTop: "16px" }}>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English.It is a long
              established fact that a reader will be distracted by the readable
              content of a page when looking at its layout. The point of using
              Lorem Ipsum is that it has a more-or-less normal distribution of
              letters, as opposed to using 'Content here, content here', making
              it look like readable English.It is a long established fact that a
              reader will be distracted by the readable content of a page when
              looking at its layout. The point of using Lorem Ipsum is that it
              has a more-or-less normal distribution of letters, as opposed to
              using 'Content here, content here', making it look like readable
              English.
            </Typography>
          </Box>

          <Box className="hedingBox" mt={2}>
            <Typography variant="h2">What is Lorem Ipsum?</Typography>
          </Box>
          <Box className="hedingBox">
            <Typography variant="body2" style={{ color: "#000000" }} mt={4}>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English.
            </Typography>
          </Box>
          <ul>
            <li>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed like readable English.
            </li>
            <li>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed like readable English.
            </li>
            <li>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed like readable English.
            </li>
          </ul>

          <Box className="hedingBox" mt={2}>
            <Typography variant="h2">Where does it come from?</Typography>
          </Box>
          <Box className="hedingBox">
            <Typography variant="body2" mt={4}>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English.
            </Typography>
          </Box>
        </Box>
      </Paper>
    </>
  );
};

export default Policy;
