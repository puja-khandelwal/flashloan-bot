import { UserContext } from "src/context/User";
import {
  Box,
  Container,
  makeStyles,
  Typography,
  Button,
} from "@material-ui/core";
import React, { useContext } from "react";

const useStyles = makeStyles((theme) => ({
  root: { padding: "70px 0px 0px" },
  bannerimg: {
    overflow: "hidden",
    background: "rgba(0,0,0,0.7)",
    position: "relative",
    backgroundPosition: "center !important",
    backgroundRepeat: " no-repeat !important",
    backgroundSize: "100% !important",
    height: "260px",
    borderRadius: "45px",
    "@media(max-width:1010px)": {
      height: "140px",
      borderRadius: "25px",
    },

    "& img": {
      minHeight: "100%",
      minWidth: "100%",
      height: "auto",
      width: "auto",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  },
  headbox2: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 20px",
    marginBottom: "15px",
    "@media(max-width:767px)": {
      display: "block",
      padding: "0 10px",
    },
  },
  text1: {
    display: "flex",
    alignItems: "center",
    "& h4": {
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "40px",
      lineHeight: "130%",
      display: "flex",
      alignItems: "center",
      "@media(max-width:1010px)": {
        fontSize: "30px",
      },
      "@media(max-width:930px)": {
        fontSize: "25px",
      },
    },
    "& h5": {
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "14px",
      lineHeight: "130%",
      color: "rgba(255, 255, 255, 0.5)",
    },
  },
  profileimg: {
    marginTop: "-140px",
    overflow: "hidden",
    backgroundPosition: "center !important",
    backgroundSize: "100% !important",
    backgroundRepeat: " no-repeat !important",
    background: "rgba(0 , 0, 0, 1)",
    width: "200px",
    height: "200px",
    borderRadius: "45px",
    zIndex: "1",
    "@media(max-width:800px)": {
      marginTop: "-35px",
      width: "95px",
      height: "95px",
      borderRadius: "25px",
      zIndex: 9,
    },
    "& img": {
      minHeight: "100%",
      minWidth: "100%",
      height: "auto",
      width: "auto",
      borderRadius: "50%",
    },
  },
}));

export default function Profile() {
  const user = useContext(UserContext);
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Container>
        <Box className={classes.bannerimg}>
          <img
            src={
              user?.userData?.coverPic
                ? user?.userData?.coverPic
                : "/images/background.png"
            }
            alt=""
          />
        </Box>
        <Box className={classes.headbox2}>
          <Box
            style={{
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            <Box
              style={{
                background:
                  "url(" +
                  `${
                    user?.userData?.profilePic
                      ? user?.userData?.profilePic
                      : "/images/about7.png"
                  }` +
                  ")",
                backgroundColor: "#d7aaf0",
                borderRadius: "100%",
              }}
              className={classes.profileimg}
            ></Box>
            &nbsp;&nbsp;
            <Box className={classes.text1}>
              <Box>
                <Typography variant="h4">
                  {user?.userData?.name}
                  <span
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#000",
                      textTransform: "uppercase",
                    }}
                  ></span>
                </Typography>
                <Typography variant="h5">{user?.userData?.userName}</Typography>
                <Typography variant="h5">{user?.userData?.email}</Typography>
                <Typography variant="h5">{user?.userData?.bio}</Typography>
                <Typography variant="h5">
                  {user?.userData?.walletAddress}
                </Typography>
              </Box>
              &nbsp;
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
