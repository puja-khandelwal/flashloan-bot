import React, { useState } from "react";
import {
  Box,
  TableContainer,
  makeStyles,
  Button,
  Paper,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Platform from "./Platform";
import Stats from "./Stats";

const useStyles = makeStyles((theme) => ({
  staticsTabBox: {
    padding: "20px",
  },
  TabButtonsBox: {
    zIndex: "999",
    position: "relative",
    margin: "30px 0",
    width: "fit-content",
    border: "1px solid #013FA7",
    borderRadius: "10px",
    padding: "5px",
    display: "flex",
    [theme.breakpoints.down("xs")]: {
      marginBottom: "20px",
    },
    "& button": {
      color: "#013FA7",
      fontSize: "14px",
      borderRadius: "10px",
      padding: "10px 35px",
      whiteSpace: "pre",
      [theme.breakpoints.down("sm")]: {
        fontSize: "12px",
        padding: "10px 28px",
      },
      "&.active": {
        color: "#fff",
        background: "#013FA7",
      },
    },
  },
}));

export default function Statics() {
  const [tabView, setTabView] = useState("Stats");
  const classes = useStyles();
  const history = useHistory();

  return (
    <Paper elevation={2} className={classes.staticsTabBox}>
      <TableContainer>
        <Box className="tabBox" align="center">
          <Box className={classes.TabButtonsBox} align="center">
            <Button
              className={tabView === "Stats" ? "active" : ""}
              onClick={() => setTabView("Stats")}
            >
              My Stats
            </Button>
            <Button
              className={tabView === "Platform" ? "active" : ""}
              onClick={() => setTabView("Platform")}
            >
              Platform Stats
            </Button>
          </Box>
        </Box>
      </TableContainer>

      {tabView === "Stats" && <Stats />}
      {tabView === "Platform" && <Platform />}
    </Paper>
  );
}
