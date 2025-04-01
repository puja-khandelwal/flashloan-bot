import React, { useState } from "react";
import {
  Box,
  Radio,
  TableContainer,
  Typography,
  makeStyles,
  Button,
  RadioGroup,
  FormControlLabel,
  Paper,
} from "@material-ui/core";
import Deploypage from "./Deploypage";
import Deployed from "./Deployed";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  deplayTab: {
    position: "relative",
    zIndex: "999",
    padding: "20px",
    "& .tabBox": {
      display: "flex",
      justifyContent: "flex-start",
      flex: 1,
      margin: "40px 0",
    },
    "& .textheding": {
      marginTop: "50px",
    },
    "& .tabButton": {
      fontSize: "13px",
      fontWeight: "500",
      color: "rgba(61, 61, 61, 1)",
      margin: "0 5px",
      whiteSpace: "pre",
      minWidth: "100px",
      background: "transaparent",
      [theme.breakpoints.down("xs")]: {
        fontSize: "12px",
      },
      "& .MuiFormControlLabel-root": {
        background: "transparent",
      },
      "& .MuiIconButton-root": {
        color: "rgba(61, 61, 61, 1) !important",
      },
      "&:hover": {
        color: "rgba(61, 61, 61, 1)",
      },
      "&.active": {
        color: "rgba(61, 61, 61, 1)",
        "& .MuiIconButton-root": {
          color: "rgba(243, 109, 54, 1) !important",
        },
      },
    },
  },
  textheadBox: {
    paddingBottom: "9px",
    borderBottom: "1px solid #80808052",
    "& h2": {
      fontSize: "40px",
      color: "rgb(243, 109, 54)",
    },
  },
}));

export default function Deploy() {
  const [tabView, setTabView] = useState("Deploypage");
  const classes = useStyles();
  const history = useHistory();
  return (
    <Paper elevation={2} className={classes.deplayTab}>
      <Box className={classes.textheadBox}>
        <Box className="displayStart">
          <img
            onClick={() => history.goBack("/")}
            src="/images/arrowback.svg"
            width="35px"
            style={{ cursor: "pointer" }}
          />
          &nbsp;&nbsp;
          <Typography variant="h2" style={{ color: "rgba(243, 109, 54, 1)" }}>
            Deploy Contract
          </Typography>
        </Box>
      </Box>
      <TableContainer>
        <Box className="tabBox">
          <RadioGroup
            style={{ width: "fit-content" }}
            value={tabView}
            onChange={(e) => setTabView(e.target.value)}
          >
            <FormControlLabel
              value="Deploypage"
              control={<Radio color="default" />}
              label="Deploy"
              className={`tabButton ${
                tabView === "Deploypage" ? "active" : ""
              }`}
            />
            <FormControlLabel
              value="Deployed"
              control={<Radio color="default" />}
              label="Deployed"
              className={`tabButton ${tabView === "Deployed" ? "active" : ""}`}
            />
          </RadioGroup>
        </Box>
      </TableContainer>

      {tabView === "Deploypage" && <Deploypage />}
      {tabView === "Deployed" && <Deployed />}
    </Paper>
  );
}
