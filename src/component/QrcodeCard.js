import React from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  txt5: {
    paddingTop: "10px",
    "& h6": {
      fontFamily: "'Sen', sans-serif",
      fontStyle: "normal",
      fontWeight: "800",
      fontSize: "14px",
      lineHeight: "17px",
      color: "#FFFFFF",
    },
  },
  imageBox: {
    position: "relative",
    borderBottom: "1px solid transparent",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "flex-end",
    cursor: "pointer",
    transition: "0.5s",
    "&:hover": {
      transform: "translateY(-10px)",
    },
    "& img": {
      maxWidth: "287px",
      width: "100%",
    },
  },
}));

export default function QrcodeCard({ data }) {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Box>
      <Box
        className={classes.imageBox}
        onClick={() => {
          history.push({
            pathname: "/wallet-detail",
            search: data.id,
          });
        }}
      >
        <figure className="wow flipInX">
          <img src={data?.nfdData?.image} alt="" />
        </figure>
      </Box>
      <Box style={{ display: "flex" }}>
        <Box className={classes.txt5}>
          <Typography variant="h6">Name</Typography>
        </Box>
        &nbsp;&nbsp;
        <Box className={classes.txt5}>
          <Typography variant="h6">{data?.nfdData?.name}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
