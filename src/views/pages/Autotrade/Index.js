import React, { useState } from "react";
import {
  Box,
  Radio,
  TableContainer,
  Typography,
  makeStyles,
  RadioGroup,
  FormControlLabel,
  Paper,
  Grid,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Simple from "./Simple";
import Triangular from "./Triangular";
import Flash from "./Flash";
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
      //   marginRight: "25px",
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

export default function Autotrade() {
  const [tabView, setTabView] = useState("Simple");
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
            Trade Settings
          </Typography>
        </Box>
      </Box>
      <TableContainer>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8} md={8}>
            <Box className="tabBox">
              <RadioGroup
                value={tabView}
                onChange={(e) => setTabView(e.target.value)}
              >
                <FormControlLabel
                  value="Simple"
                  control={<Radio color="default" />}
                  label="Simple Arbitrage"
                  className={`tabButton ${
                    tabView === "Simple" ? "active" : ""
                  }`}
                />
                <FormControlLabel
                  value="Triangular"
                  control={<Radio color="default" />}
                  label="Triangular Arbitrage"
                  className={`tabButton ${
                    tabView === "Triangular" ? "active" : ""
                  }`}
                />
                <FormControlLabel
                  value="Flash"
                  control={<Radio color="default" />}
                  label="Flash Loan"
                  className={`tabButton ${tabView === "Flash" ? "active" : ""}`}
                />
              </RadioGroup>
            </Box>
          </Grid>
        </Grid>
      </TableContainer>

      {tabView === "Simple" && <Simple />}
      {tabView === "Triangular" && <Triangular />}
      {tabView === "Flash" && <Flash />}
    </Paper>
  );
}
