import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  arbiratgemainBox: {
    position: "relative",
    marginBottom: "80px",
    "& .arbiratgepaperBox": {
      padding: "20px",
      height: "100%",
      [theme.breakpoints.down("sm")]: {
        height: "auto",
      },
    },
    "& .MuiOutlinedInput-root": {
      background: "#fff",
    },
    "& .MuiOutlinedInput-input": {
      padding: "14.5px 14px",
    },
    "& .MuiSelect-icon": {
      color: "#3D3D3D",
    },
    "& .MuiInputBase-input": {
      fontWeight: "400",
    },
    "& .MuiPopover-paper": {
      background: "#f8f8f9",
      top: "500px !important",
    },
    "& h5": {
      color: "#3D3D3D !important",
      marginTop: "0px !important",
    },
    "& p": {
      color: "#3D3D3D",
    },
    "& .gridProper": {
      display: "grid",
      gridTemplateColumns: "auto auto",
      gap: "60px",
    },
    "& .confirmBox": {
      marginTop: "100px",
    },
  },
}));

const borrowdata = [
  {
    title: "Slippage",
    name: "2.4%",
  },
  {
    title: "Borrowed Asset:",
    name: "",
  },
  {
    title: "Amount",
    name: "0",
  },
  {
    title: "Lender Fee (0.05%):",
    name: "0",
  },
];

export default function Borrow() {
  const classes = useStyles();
  const [age, setAge] = React.useState(10);

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const menuProps = {
    getContentAnchorEl: null,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left",
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "left",
    },
    elevation: 0,
    PaperProps: {
      style: {
        top: "0px !important",
        maxHeight: 250,
      },
    },
  };
  return (
    <Box className={classes.arbiratgemainBox}>
      <Paper elevation={2} className="arbiratgepaperBox">
        <Typography variant="h5">Borrow</Typography>

        <Box>
          <Box className={classes.filterBox}>
            <Typography
              variant="h6"
              style={{ color: "#3D3D3D ", marginBottom: "5px" }}
            >
              Balance: $ 1001,213
            </Typography>

            <TextField
              fullWidth
              variant="outlined"
              placeholder="Enter your amount"
            />
          </Box>
          <Box align="right" mt={1} mb={3}>
            <Typography variant="h6" style={{ color: "rgba(65, 22, 67, 1) " }}>
              USD Price :0 USD
            </Typography>
          </Box>
          {borrowdata.map((value) => (
            <Box className="displaySpaceBetween" mb={1}>
              <Typography variant="body2">{value.title}:</Typography>
              <Typography
                variant="body2"
                style={{ color: "rgba(65, 22, 67, 1)" }}
              >
                {value.name}
              </Typography>
            </Box>
          ))}
        </Box>

        <Box className="displaySpaceBetween" mb={1}>
          <Typography variant="body2" style={{ fontWeight: "600" }}>
            Payback Amount:
          </Typography>
          <Typography variant="body2" style={{ color: "rgba(65, 22, 67, 1)" }}>
            0
          </Typography>
        </Box>

        <Box className="confirmBox" align="center">
          <Button variant="contained" color="primary">
            Confirm
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
