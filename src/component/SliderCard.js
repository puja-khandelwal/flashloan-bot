import React, { useContext } from "react";
import {
  Container,
  Box,
  Grid,
  makeStyles,
  Typography,
  Button,
  withStyles,
} from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import { UserContext } from "src/context/User";
import { useHistory } from "react-router-dom";
const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 7,
    borderRadius: 2,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    borderRadius: 7,
    backgroundColor: "rgba(30, 184, 8, 1)",
  },
}))(LinearProgress);

const useStyles = makeStyles((theme) => ({
  bg: {
    background: "#0D1826",
  },
  Box: {
    margin: "16px 17px",
    display: "inline-block",
    padding: "10px",
    flesWarp: "warp",
    minWidth: "27.3%",
    boxShadow:
      "0 0 0rem #1EB808, 0 0 0rem #1EB808, 0 0 0rem #1EB808, 0 0 1rem 0px #1EB808",
    textAlign: "center",
    transition: "0.3s",
    backgroundColor: "#000",
    // filter: "blur(4px)",
    borderRadius: "25px",
    border: "3px solid #ffffffc4",
    "&:hover": {
      transform: "translateY(3px)",
      boxShadow:
        "0 0 1rem #1EB808, 0 0 0rem #1EB808, 0 0 1rem #1EB808, 0 0 4rem #1EB808",
    },

    "& img": {
      backdropFilter: "blur(10px)",
      filter: "blur(10px)",
    },
    "& h5": {
      fontFamily: "'Inter'",
      fontStyle: "normal",
      fontWeight: "300",
      fontSize: "17px",
      lineHeight: "24px",
      color: "#FFFFFF",
      paddingTop: "8px",
      paddingBottom: "10px",
    },
  },
  Eth: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: "20px",
    paddingBottom: "20px",
    alignItem: "center",
    "& h4": {
      fontFamily: "'Inter'",
      fontStyle: "normal",
      fontWeight: "300",
      fontSize: "16px",
      color: "#fff",
    },
  },
}));
export default function SliderCard({ data }) {
  const classes = useStyles();
  const history = useHistory();
  const user = useContext(UserContext);
  return (
    <>
      <Box className={classes.bg}>
        <Box className={classes.Box}>
          <img src={"images/shoes.png"} width={"100%"} />
          <Container>
            <Box className={classes.Eth}>
              <Typography variant="h4">{user?.nftPrice}</Typography>
              <Button
                className="buttonSlide"
                onClick={() =>
                  history.push({
                    pathname: "/mint",
                    search: "mint",
                  })
                }
              >
                MINT
              </Button>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
}
