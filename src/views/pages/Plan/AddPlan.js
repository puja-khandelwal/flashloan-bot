import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  makeStyles,
  TextField,
  Typography,
  FormHelperText,
  Select,
  MenuItem,
  Paper,
} from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { AiFillCamera } from "react-icons/ai";
import React, { useState, useContext } from "react";
import { Form, Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import ApiConfig from "src/config/APICongig";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { toast } from "react-toastify";
import { useWeb3React } from "@web3-react/core";
import { UserContext } from "src/context/User";
import WalletConnectModal from "src/component/ConnectWallet/WalletConnectModal";

const useStyles = makeStyles((theme) => ({
  avatorSection: {
    "paddingLeft": "14px",
    "marginBottom": "10px",
  },
  childSection: {
    position: "relative",
  },
  iconBtn: {
    border: "1px solid #222",
    position: "absolute",
    right: "-17px",
    top: "57%",
    padding: "12px 12px 7px !important",
  },
  template: {
    display: " flex",
    alignItems: "center",
    border: "1px solid #b8bcb7",
    width: "fit-content",
    padding: "10px",
    borderRadius: "10px",
    margin: " 10px 6px",
  },
}));
const formInitialSchema = {
  planname: "",
  price: "",
  time: "",
};
const formValidationSchema = yup.object().shape({
  planname: yup.string().required("Plan name is required"),
  price: yup.string().required("Plan price is required"),
  time: yup.string().required("Duration is required"),
});

export default function AddPlan({ setIsOpenEdit, type, data }) {
  const classes = useStyles();
  const [openWallect, setOpenWallect] = useState(false);
  const { activate, account, chainId, library, deactivate } = useWeb3React();
  const user = useContext(UserContext); // onClick={user.connectWallet}
  const [cropImage, setCropImage] = useState("");
  const [cropImageUrl, setCropImageUrl] = useState("");
  const [loader, setLoader] = useState("");

  const HandleWalletModal = () => {
    setOpenWallect(true);
    user.connectWallet();
  };
  const CloseWalletModal = () => {
    setOpenWallect(false);
  };
  const handleFormSubmit = async (values) => {
    console.log("values----", values);
    setLoader(true);
    try {
      if (type == "add") {
        const res = await axios({
          method: "post",
          url: ApiConfig.addSubscriptionPlan,
          headers: {
            token:
              sessionStorage.getItem("token") ||
              localStorage.getItem("creatturAccessToken"),
          },
          params: {
            name: values.planname,
            price: values.price,
            months: values.time,
          },
        });
        if (res.data.responseCode == 200) {
          setLoader(false);
          toast.success(res.data.responseMessage);
          // setPlanDataList(res.data.result);
          setIsOpenEdit(false);
        }
      }
      if (type == "edit") {
        const res = await axios({
          method: "post",
          url: ApiConfig.addSubscriptionPlan,
          headers: {
            token:
              sessionStorage.getItem("token") ||
              localStorage.getItem("creatturAccessToken"),
          },
          params: {
            name: values.planname,
            price: values.price,
            months: values.time,
          },
        });
        if (res.data.responseCode == 200) {
          setLoader(false);
          toast.success(res.data.responseMessage);
          // setPlanDataList(res.data.result);
          setIsOpenEdit(false);
        }
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  console.log("viewData----->", data);
  //   const ViewSubscriptionPlan = async () => {
  //     try {
  //       const res = await axios({
  //         method: "get",
  //         url: ApiConfig.viewSubscriptionPlan,
  //       });
  //       if (res.data.responseCode == 200) {
  //         setPlanDataList(res.data.result);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   useEffect(() => {
  //     ViewSubscriptionPlan();
  //   }, []);

  return (
    <Paper elevation={1} style={{padding:"20px"}}>
      <Box className="mainContainer">
        {openWallect && (
          <WalletConnectModal
            open={openWallect}
            handleClose={CloseWalletModal}
          />
        )}
        <Box className="arrowSection" style={{display:"flex", alignItems:"center"}}>
          <IconButton onClick={() => setIsOpenEdit(false)} style={{padding:"0px"}}>
            <ArrowBack />
          </IconButton>&nbsp;&nbsp;
          {type === "add" ? (
            <Typography variant="h4" style={{ color: "#0c0d31" }}>
              Add Plan
            </Typography>
          ) : (
            <Typography variant="h4" style={{ color: "#0c0d31" }}>
              View Plan
            </Typography>
          )}
        </Box>
        <Box mt={1} mb={3}>
          <Divider />
        </Box>
        <Formik
          onSubmit={(values) => handleFormSubmit(values)}
          initialValues={formInitialSchema}
          validationSchema={formValidationSchema}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            touched,
            values,
            setFieldValue,
          }) => (
            <Form>
              <Grid container spacing={3}>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <Box>
                    <label style={{color:"rgb(12, 13, 49)"}}>Plan Name</label>
                    <Box className="labelAll" mt={1}>
                      <TextField
                        placeholder="Enter plan name"
                        variant="outlined"
                        fullWidth
                        name="planname"
                        value={values.planname || data.name}
                        error={Boolean(touched.planname && errors.planname)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        disabled={type != "add"}
                      />
                    </Box>
                    <FormHelperText
                      error
                      style={{ margin: "0px", fontSize: "12px" }}
                    >
                      {touched.planname && errors.planname}
                    </FormHelperText>
                  </Box>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <Box>
                  <label style={{color:"rgb(12, 13, 49)"}}>Plan Price</label>
                    <Box className="labelAll numberTextField" mt={1}>
                      <TextField
                        placeholder="Enter price"
                        variant="outlined"
                        fullWidth
                        name="price"
                        type="number"
                        onKeyPress={(event) => {
                          if (
                            event?.key === "-" ||
                            event?.key === "+" ||
                            event?.key === "="
                          ) {
                            event.preventDefault();
                          }
                        }}
                        value={values.price || data.price}
                        error={Boolean(touched.price && errors.price)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        disabled={type != "add"}
                      />
                    </Box>
                    <FormHelperText
                      error
                      style={{ margin: "0px", fontSize: "12px" }}
                    >
                      {touched.price && errors.price}
                    </FormHelperText>
                  </Box>
                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <Box>
                  <label style={{color:"rgb(12, 13, 49)"}}>Duration (in months)</label>
                    <Box className="labelAll numberTextField" mt={1}>
                      <TextField
                        placeholder="Enter time"
                        variant="outlined"
                        fullWidth
                        name="time"
                        type="number"
                        onKeyPress={(event) => {
                          if (
                            event?.key === "-" ||
                            event?.key === "+" ||
                            event?.key === "="
                          ) {
                            event.preventDefault();
                          }
                        }}
                        value={values.time || data.months}
                        disabled={type != "add"}
                        error={Boolean(touched.time && errors.time)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                    </Box>
                    <FormHelperText
                      error
                      style={{ margin: "0px", fontSize: "12px" }}
                    >
                      {touched.time && errors.time}
                    </FormHelperText>
                  </Box>
                </Grid>

                <Grid xs={12}>
                  {account ? (
                    <Box className={classes.avatorSection}>
                      {type == "add" && (
                        <Box>
                          <Button
                            type="submit"
                            variant="contained"
                            disabled={loader}
                            color="primary"
                          >
                            Update {loader && <ButtonCircularProgress />}
                          </Button>
                        </Box>
                      )}
                    </Box>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      className={classes.connetwallet}
                      // onClick={user.connectWallet}
                      onClick={HandleWalletModal}
                    >
                      Connect Wallet
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </Paper>
  );
}
