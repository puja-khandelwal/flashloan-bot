import React, { useState } from "react";
import {
  Box,
  Grid,
  makeStyles,
  Typography,
  Paper,
  Avatar,
  Button,
  IconButton,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  marketBox: {
    position: "relative",
    "& h6": {
      color: "#00000080",
    },
    "& .profitButton": {
      color: "#309A47",
      background: "rgba(255, 255, 255, 1) !important",
      border: "1px solid #fff !important",
      fontWeight: "500",
      fontSize: "16px !important",
    },
    "& .excuteButton": {
      background: "rgba(65, 22, 67, 1) !important",
      color: "#fff !important",
      border: "1px solid rgba(65, 22, 67, 1) !important",
    },
    "& .displaySpaceBetween": {
      alignItems: "flex-start",
      position: "relative",
      zIndex: "9",
      "&::before": {
        width: "5px",
        height: "100%",
        content: "''",
        zIndex: "1",
        position: "absolute",
        background: "rgba(65, 22, 67, 1)",
        top: "0",
        left: "0",
        borderRadius: "10px",
      },
    },
    "& .marketinnerbox": {
      padding: "20px",
      paddingBottom: "100px",
    },
    "& .exchangeBox": {
      "&::before": {
        background: "rgb(255, 85, 0) !important",
      },
    },

    "& .iconbox": {
      borderRadius: "0px",
      width: "80px",
      height: "80px",
      cursor: "pointer",
    },
    "& .marketdinner": {
      padding: "20px",
      "& h5": {
        fontWeight: "500",
        fontSize: "18px",
        lineHeight: "30px",
      },
    },
  },
  textheadBox: {
    marginBottom: "20px",
    "& h2": {
      color: "#3D3D3D",
      fontSize: "30px",
      fontWeight: "500",
    },
  },
}));

export default function Market() {
  const classes = useStyles();
  const history = useHistory();
  const [isSwapped, setIsSwapped] = useState(false);

  const handleSwap = () => {
    setIsSwapped(!isSwapped);
  };

  return (
    <Box className={classes.marketBox}>
      <Paper elevation={2} className="marketinnerbox">
        <Box className={classes.textheadBox}>
          <Box className="displayStart">
            <Typography variant="h2">Profit Opportunities</Typography>
          </Box>
        </Box>
        <Grid container spacing={3} style={{ alignItems: "center" }}>
          <Grid item md={4} sm={6} xs={12}>
            <Paper
              elevation={2}
              className="marketdinner"
              style={{
                background:
                  "linear-gradient(to right, rgba(254, 202, 82, 1) 0%,  rgba(255, 123, 2, 1)",
              }}
            >
              <Box className="displayCenter">
                <Box align="center">
                  <Avatar
                    src={
                      isSwapped
                        ? "/images/market/dog.png"
                        : "/images/market/btc.png"
                    }
                    className="iconbox"
                  />
                  <Typography variant="h5">
                    {isSwapped ? "Doge" : "BTC"}
                  </Typography>
                </Box>

                <IconButton onClick={handleSwap} style={{ marginTop: "-22px" }}>
                  <img
                    src={
                      isSwapped
                        ? "/images/market/arrow.png"
                        : "/images/market/arrow.png"
                    }
                    width="40"
                    alt="Swap"
                    className={isSwapped ? "arrowIcon" : "arrowIcon1"}
                  />
                </IconButton>
                <Box align="center">
                  <Avatar
                    src={
                      isSwapped
                        ? "/images/market/btc.png"
                        : "/images/market/dog.png"
                    }
                    className="iconbox"
                  />

                  <Typography variant="h5">
                    {isSwapped ? "BTC" : "Doge"}
                  </Typography>
                </Box>
              </Box>

              <Box mt={2} align="center">
                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  className="profitButton"
                  onClick={() => history.push("/cross-exchange-more")}
                >
                  Profit 1.0008%
                </Button>
              </Box>
              <Box mt={1.3} align="center">
                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  className="profitButton excuteButton"
                  onClick={() => history.push("/profit-opportunities")}
                >
                  Execute
                </Button>
              </Box>
            </Paper>
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <Paper
              elevation={2}
              className="marketdinner"
              style={{
                background:
                  "linear-gradient(to right, rgba(86, 129, 241, 1) 0%,  rgba(19, 84, 252, 1)",
              }}
            >
              <Box className="displayCenter">
                <Box align="center">
                  <Avatar
                    src={
                      isSwapped
                        ? "/images/market/dog.png"
                        : "/images/market/btc.png"
                    }
                    className="iconbox"
                  />
                  <Typography variant="h5">
                    {isSwapped ? "Doge" : "BTC"}
                  </Typography>
                </Box>

                <IconButton onClick={handleSwap} style={{ marginTop: "-22px" }}>
                  <img
                    src={
                      isSwapped
                        ? "/images/market/arrow.png"
                        : "/images/market/arrow.png"
                    }
                    width="40"
                    alt="Swap"
                    className={isSwapped ? "arrowIcon" : "arrowIcon1"}
                  />
                </IconButton>
                <Box align="center">
                  <Avatar
                    src={
                      isSwapped
                        ? "/images/market/btc.png"
                        : "/images/market/dog.png"
                    }
                    className="iconbox"
                  />

                  <Typography variant="h5">
                    {isSwapped ? "BTC" : "Doge"}
                  </Typography>
                </Box>
              </Box>
              <Box mt={2} align="center">
                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  className="profitButton"
                  onClick={() => history.push("/cross-exchange-more")}
                >
                  Profit 1.0008%
                </Button>
              </Box>
              <Box mt={1.3} align="center">
                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  className="profitButton excuteButton"
                  onClick={() => history.push("/profit-opportunities")}
                >
                  Execute
                </Button>
              </Box>
            </Paper>
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <Paper
              elevation={2}
              className="marketdinner"
              style={{
                background:
                  "linear-gradient(to right, rgba(192, 101, 222, 1) 0%,  rgba(96, 42, 252, 1)",
              }}
            >
              <Box className="displayCenter">
                <Box align="center">
                  <Avatar
                    src={
                      isSwapped
                        ? "/images/market/dog.png"
                        : "/images/market/btc.png"
                    }
                    className="iconbox"
                  />
                  <Typography variant="h5">
                    {isSwapped ? "Doge" : "BTC"}
                  </Typography>
                </Box>

                <IconButton onClick={handleSwap} style={{ marginTop: "-22px" }}>
                  <img
                    src={
                      isSwapped
                        ? "/images/market/arrow.png"
                        : "/images/market/arrow.png"
                    }
                    width="40"
                    alt="Swap"
                    className={isSwapped ? "arrowIcon" : "arrowIcon1"}
                  />
                </IconButton>
                <Box align="center">
                  <Avatar
                    src={
                      isSwapped
                        ? "/images/market/btc.png"
                        : "/images/market/dog.png"
                    }
                    className="iconbox"
                  />

                  <Typography variant="h5">
                    {isSwapped ? "BTC" : "Doge"}
                  </Typography>
                </Box>
              </Box>

              <Box mt={2} align="center">
                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  className="profitButton"
                  onClick={() => history.push("/cross-exchange-more")}
                >
                  Profit 1.0008%
                </Button>
              </Box>
              <Box mt={1.3} align="center">
                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  className="profitButton excuteButton"
                  onClick={() => history.push("/profit-opportunities")}
                >
                  Execute
                </Button>
              </Box>
            </Paper>
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <Paper
              elevation={2}
              className="marketdinner"
              style={{
                background:
                  "linear-gradient(to right, rgba(0, 175, 250, 1) 0%,  rgba(75, 255, 212, 1)",
              }}
            >
              <Box className="displayCenter">
                <Box align="center">
                  <Avatar
                    src={
                      isSwapped
                        ? "/images/market/dog.png"
                        : "/images/market/btc.png"
                    }
                    className="iconbox"
                  />
                  <Typography variant="h5">
                    {isSwapped ? "Doge" : "BTC"}
                  </Typography>
                </Box>

                <IconButton onClick={handleSwap} style={{ marginTop: "-22px" }}>
                  <img
                    src={
                      isSwapped
                        ? "/images/market/arrow.png"
                        : "/images/market/arrow.png"
                    }
                    width="40"
                    alt="Swap"
                    className={isSwapped ? "arrowIcon" : "arrowIcon1"}
                  />
                </IconButton>
                <Box align="center">
                  <Avatar
                    src={
                      isSwapped
                        ? "/images/market/btc.png"
                        : "/images/market/dog.png"
                    }
                    className="iconbox"
                  />

                  <Typography variant="h5">
                    {isSwapped ? "BTC" : "Doge"}
                  </Typography>
                </Box>
              </Box>

              <Box mt={2} align="center">
                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  className="profitButton"
                  onClick={() => history.push("/cross-exchange-more")}
                >
                  Profit 1.0008%
                </Button>
              </Box>
              <Box mt={1.3} align="center">
                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  className="profitButton excuteButton"
                  onClick={() => history.push("/profit-opportunities")}
                >
                  Execute
                </Button>
              </Box>
            </Paper>
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <Paper
              elevation={2}
              className="marketdinner"
              style={{
                background:
                  "linear-gradient(to right, rgba(38, 99, 255, 1) 0%,  rgba(255, 75, 162, 1)",
              }}
            >
              <Box className="displayCenter">
                <Box align="center">
                  <Avatar
                    src={
                      isSwapped
                        ? "/images/market/dog.png"
                        : "/images/market/btc.png"
                    }
                    className="iconbox"
                  />
                  <Typography variant="h5">
                    {isSwapped ? "Doge" : "BTC"}
                  </Typography>
                </Box>

                <IconButton onClick={handleSwap} style={{ marginTop: "-22px" }}>
                  <img
                    src={
                      isSwapped
                        ? "/images/market/arrow.png"
                        : "/images/market/arrow.png"
                    }
                    width="40"
                    alt="Swap"
                    className={isSwapped ? "arrowIcon" : "arrowIcon1"}
                  />
                </IconButton>
                <Box align="center">
                  <Avatar
                    src={
                      isSwapped
                        ? "/images/market/btc.png"
                        : "/images/market/dog.png"
                    }
                    className="iconbox"
                  />

                  <Typography variant="h5">
                    {isSwapped ? "BTC" : "Doge"}
                  </Typography>
                </Box>
              </Box>

              <Box mt={2} align="center">
                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  className="profitButton"
                >
                  Profit 1.0008%
                </Button>
              </Box>
              <Box mt={1.3} align="center">
                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  className="profitButton excuteButton"
                  onClick={() => history.push("/profit-opportunities")}
                >
                  Execute
                </Button>
              </Box>
            </Paper>
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <Paper
              elevation={2}
              className="marketdinner"
              style={{
                background:
                  "linear-gradient(to right, rgba(243, 54, 88, 1) 0%,  rgba(29, 41, 149, 1)",
              }}
            >
              <Box className="displayCenter">
                <Box align="center">
                  <Avatar
                    src={
                      isSwapped
                        ? "/images/market/dog.png"
                        : "/images/market/btc.png"
                    }
                    className="iconbox"
                  />
                  <Typography variant="h5">
                    {isSwapped ? "Doge" : "BTC"}
                  </Typography>
                </Box>

                <IconButton onClick={handleSwap} style={{ marginTop: "-22px" }}>
                  <img
                    src={
                      isSwapped
                        ? "/images/market/arrow.png"
                        : "/images/market/arrow.png"
                    }
                    width="40"
                    alt="Swap"
                    className={isSwapped ? "arrowIcon" : "arrowIcon1"}
                  />
                </IconButton>
                <Box align="center">
                  <Avatar
                    src={
                      isSwapped
                        ? "/images/market/btc.png"
                        : "/images/market/dog.png"
                    }
                    className="iconbox"
                  />

                  <Typography variant="h5">
                    {isSwapped ? "BTC" : "Doge"}
                  </Typography>
                </Box>
              </Box>

              <Box mt={2} align="center">
                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  className="profitButton"
                >
                  Profit 1.0008%
                </Button>
              </Box>
              <Box mt={1.3} align="center">
                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  className="profitButton excuteButton"
                  onClick={() => history.push("/profit-opportunities")}
                >
                  Execute
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
