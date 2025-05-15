// import React, { useContext, useState } from "react";
// import {
//   Grid,
//   Box,
//   Button,
//   FormControl,
//   makeStyles,
//   Paper,
// } from "@material-ui/core";
// import TextField from "@material-ui/core/TextField";
// import { useHistory } from "react-router-dom";
// import { UserContext } from "src/context/User";
// import { IoSettingsSharp } from "react-icons/io5";

// const useStyles = makeStyles((theme) => ({
//   uploadProfile: {
//     width: "150px",
//     border: "1px solid rgb(8, 86, 204)",
//     height: "150px",
//     position: "relative",
//     background: "rgb(8, 86, 204)",
//     borderRadius: "100px",
//     marginTop: "-91px",
//     [theme.breakpoints.down("xs")]: {
//       width: "100px",
//       height: "100px",
//     },
//     "& .camerChooseButton": {
//       position: "absolute",
//       bottom: "0px",
//       right: "-10px",
//     },
//   },

//   mainprofileBox: {
//     padding: "0px 0",
//     position: "relative",
//     [theme.breakpoints.down("xs")]: {
//       padding: "5px 0",
//     },
//     "& .formInnerBox": {
//       marginTop: "40px",
//     },
//     "& .coverbackgroundImage": {
//       top: "0px",
//       width: "100%",
//       height: "250px",
//       position: "relative",
//       objectFit: "cover !important",
//       borderRadius: "10px",
//       backgroundSize: "cover !important",
//       backgroundRepeat: "no-repeat !important",
//       background: "#fff",
//       [theme.breakpoints.down("xs")]: {
//         height: "130px",
//       },
//     },

//     "& label": {
//       color: "rgba(61, 61, 61, 1)",
//     },
//     "& .changepasswordbutton": {
//       marginTop: "-50px",
//       [theme.breakpoints.down("xs")]: {
//         marginTop: "40px",
//       },
//       "& .changeBtn": {
//         background: "rgba(65, 22, 67, 1)",
//         color: "#fff",
//         borderRadius: "30px",
//         padding: "10px 20px 10px 20px",
//         fontSize: "18px",
//       },
//     },
//   },
//   PageHeading: {
//     paddingBottom: "20px",
//     lineHeight: "140%",
//     fontSize: "24px",
//   },
//   editsection: {
//     marginTop: "10px",
//     "& h2": {
//       color: "#14133b",
//       fontStyle: "normal",
//       fontWeight: "600",
//       fontSize: "33px",
//       lineHeight: "130%",
//       fontFamily: "'Mulish', sans-serif",
//     },
//     "& p": {
//       color: "#14133b",
//       fontWeight: "400",
//     },
//     "& h3": {
//       fontStyle: "normal",
//       fontWeight: "500",
//       fontSize: "14px",
//       lineHeight: "130%",
//       color: "#14133b",
//     },
//   },
//   inputfield: {
//     "& label": {
//       color: "#14133b",
//       marginTop: "22px",
//       fontSize: "14px",
//     },
//   },
//   imagefiled: {
//     marginTop: "-82px",
//     position: "relative",
//     zIndex: "9",
//     "& label": {
//       color: "#14133b",
//     },
//     "& small": {},
//   },
//   inputsection: {
//     color: "#52565c",
//     cursor: "text",
//     position: "relative",
//     fontSize: "1rem",
//     boxSizing: "border-box",
//     fontWeight: "400",
//     lineHeight: "1.1876em",
//     paddingTop: "10px",
//     "& label": {
//       color: "rgba(61, 61, 61, 1)",
//     },
//     "& .formClass": {
//       marginTop: "40px",
//     },
//   },
//   message: { color: "#14133b" },
//   colorbox: {
//     boxShadow: "0 0 40px 0 rgb(94 92 154 / 6%)",
//     position: "relative",
//     backgroundColor: "#fff",

//     borderRadius: "10px",
//     height: "auto",
//     // width: "100%",
//     padding: "20px",
//     "& label": {
//       color: "#14133b",
//     },
//   },
//   paperBox: {
//     padding: "20px",
//     position: "relative",
//     marginTop: "-4px",
//     borderRadius: "0px 0 10px 10px !important",
//     "& .mainUploadProfile": {
//       marginTop: "-100px",
//       position: "relative",
//       zIndex: "999",
//     },
//   },
//   profileUpload: {
//     marginTop: "-76px",
//     position: "relative",
//     zIndex: "999",
//     "& img": {
//       height: "100px",
//       width: "100px",
//       borderRadius: "50%",
//       objectFit: "cover",
//     },
//   },
//   colorbox1: {
//     // width: "100%",
//     padding: "20px",
//     [theme.breakpoints.down("sm")]: {
//       height: "auto",
//     },
//     "& label": {
//       color: "#14133b",
//     },
//     "& .camerChooseButton": {
//       position: "absolute",
//       bottom: "0px",
//       right: "-10px",
//     },
//   },
//   coverImg: {
//     overflow: "hidden",
//     // background: 'rgba(0,0,0,0.7)',
//     position: "relative",
//     backgroundPosition: "center !important",
//     backgroundRepeat: " no-repeat !important",
//     backgroundSize: "100% !important",
//     height: "86px",
//     borderRadius: "10px",
//     width: "300px",

//     "& img": {
//       height: "auto",
//       width: "100%",
//       position: "absolute",
//       top: "50%",
//       left: "50%",
//       transform: "translate(-50%, -50%)",
//     },
//   },
//   box1: {
//     background: theme.palette.primary.main,
//     border: "1px solid #898989",
//     height: "250px",
//     borderRadius: "10px",
//     width: "100%",
//     overflow: "hidden",
//   },
// }));

// export default function Profile() {
//   const classes = useStyles();
//   const user = useContext(UserContext);
//   console.log("useruser==>>>", user?.userData);
//   const history = useHistory();

//   return (
//     <Box className={classes.mainprofileBox}>
//       <Box>
//         <img
//           className="coverbackgroundImage"
//           src={
//             user.userData?.coverPic
//               ? user.userData?.coverPic
//               : "/images/profile_banner.svg"
//           }
//           alt="Default Image"
//         />
//       </Box>
//       <Paper elevation={2} className={classes.paperBox}>
//         <Box mainUploadProfile>
//           <Box className={classes.profileUpload}>
//             <img
//               src={
//                 user.userData?.profilePic
//                   ? user.userData?.profilePic
//                   : "/images/profile_banner.svg"
//               }
//               alt=""
//             />
//           </Box>
//         </Box>
//         {/* <Box className="changepasswordbutton" align="right">
//           <Button
//             className="changeBtn"
//             variant="contained"
//             startIcon={<IoSettingsSharp />}
//             onClick={() => history.push("/change-password")}
//           >
//             Change Password
//           </Button>
//         </Box> */}
//         <Box mb={2} className="formInnerBox">
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={12} md={6} className={classes.editsection}>
//               <label>First Name</label>
//               <FormControl fullWidth className={classes.inputsection}>
//                 <TextField
//                   name="firstName"
//                   placeholder="Enter your first name"
//                   variant="outlined"
//                   value={user?.userData?.firstName}
//                   disabled
//                 />
//               </FormControl>
//             </Grid>

//             <Grid item xs={12} sm={12} md={6} className={classes.editsection}>
//               <label>Last name</label>
//               <FormControl fullWidth className={classes.inputsection}>
//                 <TextField
//                   name="lastName"
//                   placeholder="Enter your last name"
//                   variant="outlined"
//                   value={user?.userData?.lastName}
//                   disabled
//                 />
//               </FormControl>
//             </Grid>

//             <Grid item xs={12} sm={12} md={6} className={classes.editsection}>
//               <label>Username</label>
//               <FormControl fullWidth className={classes.inputsection}>
//                 <TextField
//                   placeholder="Enter your username"
//                   name="userName"
//                   variant="outlined"
//                   value={user?.userData?.userName}
//                   disabled
//                 />
//               </FormControl>
//             </Grid>

//             <Grid item xs={12} sm={12} md={6} className={classes.editsection}>
//               <label>Email Address </label>
//               <FormControl fullWidth className={classes.inputsection}>
//                 <TextField
//                   placeholder="Enter your email"
//                   type="email"
//                   name="email"
//                   variant="outlined"
//                   value={user?.userData?.email}
//                   disabled
//                 />
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} sm={12} md={12} className={classes.editsection}>
//               <label>Mobile Number</label>
//               <FormControl fullWidth className={classes.inputsection}>
//                 <TextField
//                   placeholder="Enter your number"
//                   name="mobileNumber"
//                   variant="outlined"
//                   value={user?.userData?.mobileNumber}
//                   disabled
//                 />
//               </FormControl>
//             </Grid>
//           </Grid>

//           <Box className={classes.inputfield}>
//             <Box align="left" mt={3}>
//               <Button
//                 variant="contained"
//                 size="large"
//                 color="primary"
//                 style={{ minWidth: "140px" }}
//                 type="submit"
//                 // onClick={() => history.push("/edit-profile")}
//               >
//                 Back
//               </Button>
//             </Box>
//           </Box>
//         </Box>
//       </Paper>
//     </Box>
//   );
// }


import React, { useContext, useState, useEffect } from "react";
import {
  Grid,
  Box,
  Button,
  FormControl,
  makeStyles,
  Paper,
  Snackbar,
  CircularProgress,
  Switch,
  FormControlLabel,
  Typography,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import { UserContext } from "src/context/User";
import { IoSettingsSharp } from "react-icons/io5";
import axios from "axios";
import ApiConfig from "src/config/APICongig"; // Adjust the import path based on your project structure

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  uploadProfile: {
    width: "150px",
    border: "1px solid rgb(8, 86, 204)",
    height: "150px",
    position: "relative",
    background: "rgb(8, 86, 204)",
    borderRadius: "100px",
    marginTop: "-91px",
    [theme.breakpoints.down("xs")]: {
      width: "100px",
      height: "100px",
    },
    "& .camerChooseButton": {
      position: "absolute",
      bottom: "0px",
      right: "-10px",
    },
  },

  mainprofileBox: {
    padding: "0px 0",
    position: "relative",
    [theme.breakpoints.down("xs")]: {
      padding: "5px 0",
    },
    "& .formInnerBox": {
      marginTop: "40px",
    },
    "& .coverbackgroundImage": {
      top: "0px",
      width: "100%",
      height: "250px",
      position: "relative",
      objectFit: "cover !important",
      borderRadius: "10px",
      backgroundSize: "cover !important",
      backgroundRepeat: "no-repeat !important",
      background: "#fff",
      [theme.breakpoints.down("xs")]: {
        height: "130px",
      },
    },

    "& label": {
      color: "rgba(61, 61, 61, 1)",
    },
    "& .changepasswordbutton": {
      marginTop: "-50px",
      [theme.breakpoints.down("xs")]: {
        marginTop: "40px",
      },
      "& .changeBtn": {
        background: "rgba(65, 22, 67, 1)",
        color: "#fff",
        borderRadius: "30px",
        padding: "10px 20px 10px 20px",
        fontSize: "18px",
      },
    },
  },
  PageHeading: {
    paddingBottom: "20px",
    lineHeight: "140%",
    fontSize: "24px",
  },
  editsection: {
    marginTop: "10px",
    "& h2": {
      color: "#14133b",
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "33px",
      lineHeight: "130%",
      fontFamily: "'Mulish', sans-serif",
    },
    "& p": {
      color: "#14133b",
      fontWeight: "400",
    },
    "& h3": {
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: "130%",
      color: "#14133b",
    },
  },
  inputfield: {
    "& label": {
      color: "#14133b",
      marginTop: "22px",
      fontSize: "14px",
    },
  },
  imagefiled: {
    marginTop: "-82px",
    position: "relative",
    zIndex: "9",
    "& label": {
      color: "#14133b",
    },
    "& small": {},
  },
  inputsection: {
    color: "#52565c",
    cursor: "text",
    position: "relative",
    fontSize: "1rem",
    boxSizing: "border-box",
    fontWeight: "400",
    lineHeight: "1.1876em",
    paddingTop: "10px",
    "& label": {
      color: "rgba(61, 61, 61, 1)",
    },
    "& .formClass": {
      marginTop: "40px",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#e0e0e0",
      },
      "&:hover fieldset": {
        borderColor: "#bdbdbd",
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.main,
      },
      "&.Mui-disabled fieldset": {
        borderColor: "#e0e0e0",
      },
    },
  },
  message: { color: "#14133b" },
  colorbox: {
    boxShadow: "0 0 40px 0 rgb(94 92 154 / 6%)",
    position: "relative",
    backgroundColor: "#fff",

    borderRadius: "10px",
    height: "auto",
    // width: "100%",
    padding: "20px",
    "& label": {
      color: "#14133b",
    },
  },
  paperBox: {
    padding: "20px",
    position: "relative",
    marginTop: "-4px",
    borderRadius: "0px 0 10px 10px !important",
    "& .mainUploadProfile": {
      marginTop: "-100px",
      position: "relative",
      zIndex: "999",
    },
  },
  profileUpload: {
    marginTop: "-76px",
    position: "relative",
    zIndex: "999",
    "& img": {
      height: "100px",
      width: "100px",
      borderRadius: "50%",
      objectFit: "cover",
    },
  },
  colorbox1: {
    // width: "100%",
    padding: "20px",
    [theme.breakpoints.down("sm")]: {
      height: "auto",
    },
    "& label": {
      color: "#14133b",
    },
    "& .camerChooseButton": {
      position: "absolute",
      bottom: "0px",
      right: "-10px",
    },
  },
  coverImg: {
    overflow: "hidden",
    // background: 'rgba(0,0,0,0.7)',
    position: "relative",
    backgroundPosition: "center !important",
    backgroundRepeat: " no-repeat !important",
    backgroundSize: "100% !important",
    height: "86px",
    borderRadius: "10px",
    width: "300px",

    "& img": {
      height: "auto",
      width: "100%",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  },
  box1: {
    background: theme.palette.primary.main,
    border: "1px solid #898989",
    height: "250px",
    borderRadius: "10px",
    width: "100%",
    overflow: "hidden",
  },
  buttonGroup: {
    display: "flex",
    gap: "16px",
    marginTop: "24px",
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    minHeight: "300px",
  },
  autoTradingSection: {
    marginTop: "32px",
    padding: "16px",
    borderRadius: "8px",
    backgroundColor: "#f5f5f5",
    border: "1px solid #e0e0e0",
  },
  autoTradingToggle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "8px",
  },
  switchLabel: {
    marginRight: "16px",
  },
  toggleContainer: {
    display: "flex",
    alignItems: "center",
  },
  statusIndicator: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    marginRight: "8px",
  },
  statusText: {
    fontWeight: "500",
  },
  activeStatus: {
    backgroundColor: "#4caf50",
  },
  inactiveStatus: {
    backgroundColor: "#f44336",
  },
}));

export default function Profile() {
  const classes = useStyles();
  const user = useContext(UserContext);
  const history = useHistory();
  const [isEditable, setIsEditable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    mobileNumber: "",
  });
  const [autoTradingEnabled, setAutoTradingEnabled] = useState(false);
  const [autoTradingLoading, setAutoTradingLoading] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Get user profile from API
  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const res = await axios({
        method: "GET",
        url: ApiConfig.profile,
        headers: {
          "x-auth-token": sessionStorage.getItem("token") || localStorage.getItem("creatturAccessToken"),
        },
      });
      
      if (res.data) {
        const userData = res.data;
        setFormData({
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
          username: userData.username || "",
          email: userData.email || "",
          mobileNumber: userData.mobileNumber || "",
        });
        
        // Set auto-trading status
        setAutoTradingEnabled(userData.autoTrading || false);
        
        // You might want to update the context as well
        if (user && user.setUserData) {
          user.setUserData(userData);
        }
      }
      setLoading(false);
    } catch (error) {
      console.log("Error fetching user profile:", error);
      setAlert({
        open: true,
        message: "Failed to load profile information",
        severity: "error",
      });
      setLoading(false);
    }
  };

  // Update user profile
  const updateUserProfile = async () => {
    try {
      setLoading(true);
      const res = await axios({
        method: "PUT",
        url: ApiConfig.profile,
        headers: {
          "x-auth-token": sessionStorage.getItem("token") || localStorage.getItem("creatturAccessToken"),
        },
        data: formData,
      });
      
      if (res.data) {
        setAlert({
          open: true,
          message: "Profile updated successfully",
          severity: "success",
        });
        
        // Update context with new data
        if (user && user.setUserData) {
          user.setUserData(res.data);
        }
        
        setIsEditable(false);
      }
      setLoading(false);
    } catch (error) {
      console.log("Error updating profile:", error);
      let errorMessage = "Failed to update profile";
      
      // Handle validation errors
      if (error.response && error.response.data && error.response.data.errors) {
        const firstError = error.response.data.errors[0];
        if (firstError) {
          errorMessage = firstError.msg;
        }
      }
      
      setAlert({
        open: true,
        message: errorMessage,
        severity: "error",
      });
      setLoading(false);
    }
  };
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle alert close
  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert((prev) => ({ ...prev, open: false }));
  };

  // Load profile data on component mount
  useEffect(() => {
    fetchUserProfile();
  }, []);

  // If data is already in context, set initial form data
  useEffect(() => {
    if (user && user.userData) {
      setFormData({
        firstName: user.userData.firstName || "",
        lastName: user.userData.lastName || "",
        username: user.userData.userName || user.userData.username || "",
        email: user.userData.email || "",
        mobileNumber: user.userData.mobileNumber || "",
      });
      
      // Set auto-trading status if available in context
      if (user.userData.hasOwnProperty('autoTrading')) {
        setAutoTradingEnabled(user.userData.autoTrading);
      }
    }
  }, [user]);
  
  // Handle auto-trading toggle
  const handleAutoTradingToggle = async () => {
    try {
      setAutoTradingLoading(true);
      
      // Determine which endpoint to call based on current state
      const endpoint = autoTradingEnabled 
        ? ApiConfig.stopAutoTrading // If currently enabled, call to disable
        : ApiConfig.startAutoTrading; // If currently disabled, call to enable
      
      const res = await axios({
        method: "POST",
        url: endpoint,
        headers: {
          "x-auth-token": sessionStorage.getItem("token") || localStorage.getItem("creatturAccessToken"),
        },
      });
      
      if (res.data) {
        // Update local state
        setAutoTradingEnabled(res.data.autoTrading);
        
        // Update context if available
        if (user && user.setUserData && user.userData) {
          user.setUserData({
            ...user.userData,
            autoTrading: res.data.autoTrading,
          });
        }
        
        // Show success message
        setAlert({
          open: true,
          message: res.data.msg || `Auto-trading ${res.data.autoTrading ? 'enabled' : 'disabled'} successfully!`,
          severity: "success",
        });
      }
      
      setAutoTradingLoading(false);
    } catch (error) {
      console.log("Error toggling auto-trading:", error);
      
      setAlert({
        open: true,
        message: "Failed to update auto-trading settings",
        severity: "error",
      });
      
      setAutoTradingLoading(false);
    }
  };

  if (loading && !isEditable) {
    return (
      <Box className={classes.mainprofileBox}>
        <Box className={classes.loadingContainer}>
          <CircularProgress />
        </Box>
      </Box>
    );
  }

  return (
    <Box className={classes.mainprofileBox}>
      {/* <Snackbar 
        open={alert.open} 
        autoHideDuration={6000} 
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleAlertClose} severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar> */}
      
      <Box>
        <img
          className="coverbackgroundImage"
          src={
            user.userData?.coverPic
              ? user.userData?.coverPic
              : "/images/profile_banner.svg"
          }
          alt="Default Image"
        />
      </Box>
      <Paper elevation={2} className={classes.paperBox}>
        <Box mainUploadProfile>
          <Box className={classes.profileUpload}>
            <img
              src={
                user.userData?.profilePic
                  ? user.userData?.profilePic
                  : "/images/profile_banner.svg"
              }
              alt=""
            />
          </Box>
        </Box>
        
        <Box className="changepasswordbutton" align="right">
          <Button
            className="changeBtn"
            variant="contained"
            startIcon={<IoSettingsSharp />}
            onClick={() => history.push("/change-password")}
          >
            Change Password
          </Button>
        </Box>
        
        <Box mb={2} className="formInnerBox">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6} className={classes.editsection}>
              <label>First Name</label>
              <FormControl fullWidth className={classes.inputsection}>
                <TextField
                  name="firstName"
                  placeholder="Enter your first name"
                  variant="outlined"
                  value={formData.firstName}
                  disabled={!isEditable}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} md={6} className={classes.editsection}>
              <label>Last name</label>
              <FormControl fullWidth className={classes.inputsection}>
                <TextField
                  name="lastName"
                  placeholder="Enter your last name"
                  variant="outlined"
                  value={formData.lastName}
                  disabled={!isEditable}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} md={6} className={classes.editsection}>
              <label>Username</label>
              <FormControl fullWidth className={classes.inputsection}>
                <TextField
                  placeholder="Enter your username"
                  name="username"
                  variant="outlined"
                  value={formData.username}
                  disabled={!isEditable}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} md={6} className={classes.editsection}>
              <label>Email Address </label>
              <FormControl fullWidth className={classes.inputsection}>
                <TextField
                  placeholder="Enter your email"
                  type="email"
                  name="email"
                  variant="outlined"
                  value={formData.email}
                  disabled={!isEditable}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={12} md={12} className={classes.editsection}>
              <label>Mobile Number</label>
              <FormControl fullWidth className={classes.inputsection}>
                <TextField
                  placeholder="Enter your number"
                  name="mobileNumber"
                  variant="outlined"
                  value={formData.mobileNumber}
                  disabled={!isEditable}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
          </Grid>

          {/* Auto Trading Toggle Section */}
          <Box className={classes.autoTradingSection}>
            <Typography variant="h6" gutterBottom>
              Auto Trading Settings
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              Enable or disable automatic trading functionality. When enabled, the system will automatically execute trades based on your predefined strategies.
            </Typography>
            
            <Box className={classes.autoTradingToggle}>
              <Box className={classes.toggleContainer}>
                <Box 
                  className={`${classes.statusIndicator} ${autoTradingEnabled ? classes.activeStatus : classes.inactiveStatus}`}
                />
                <Typography variant="body1" className={classes.statusText}>
                  Auto Trading is currently {autoTradingEnabled ? 'Enabled' : 'Disabled'}
                </Typography>
              </Box>
              
              <FormControlLabel
                control={
                  <Switch
                    checked={autoTradingEnabled}
                    onChange={handleAutoTradingToggle}
                    name="autoTrading"
                    color="primary"
                    disabled={autoTradingLoading}
                  />
                }
                label={autoTradingLoading ? <CircularProgress size={24} /> : (autoTradingEnabled ? "Disable" : "Enable")}
                className={classes.switchLabel}
              />
            </Box>
          </Box>

          <Box className={classes.buttonGroup}>
            {isEditable ? (
              <>
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  style={{ minWidth: "140px" }}
                  onClick={updateUserProfile}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : "Save Changes"}
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  color="secondary"
                  style={{ minWidth: "140px" }}
                  onClick={() => {
                    setIsEditable(false);
                    // Reset form data to original values
                    if (user && user.userData) {
                      setFormData({
                        firstName: user.userData.firstName || "",
                        lastName: user.userData.lastName || "",
                        username: user.userData.userName || user.userData.username || "",
                        email: user.userData.email || "",
                        mobileNumber: user.userData.mobileNumber || "",
                      });
                    }
                  }}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                size="large"
                color="primary"
                style={{ minWidth: "140px" }}
                onClick={() => setIsEditable(true)}
              >
                Edit Profile
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}