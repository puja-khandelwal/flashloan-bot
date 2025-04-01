import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  makeStyles,
  Typography,
  Divider,
  Button,
  Grid,
} from "@material-ui/core";
import React, { useState, useContext, useEffect } from "react";
import { GiFarmer } from "react-icons/gi";
import { MdPendingActions } from "react-icons/md";
import { SiStatuspal } from "react-icons/si";
import PlanData from "./PlanData";
import AddPlan from "./AddPlan";
import axios from "axios";
import ApiConfig from "src/config/APICongig";
import { useWeb3React } from "@web3-react/core";
import { UserContext } from "src/context/User";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    // padding: 20px 25px 40px;
    background: "#191c24",
    boxShadow: "0 8px 32px 0 rgb(31 38 135 / 37%)",
    boxSizing: "border-box",
    padding: "20px",
    backdropFilter: "blur(5.5px)",
    borderRadius: "10px",
    border: "1px solid rgba( 255, 255, 255, 0.18 )",
    [theme.breakpoints.down("sm")]: {
      padding: "0px 20px 0px 20px",
    },
    "& h4": {
      color: "#14133b",
      fontSize: "22px",
    },
  },
  addFarner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& h4": {
      color: "#14133b",
      // fontSize: "22px",
    },
  },
  mainBox: {
    margin: "50px 0px",
    "& .MuiTableCell-root": {
      height: "40px",
      padding: "0 10px",
    },

    "& .MuiTableCell-body": {
      height: "56px",
      padding: "0 10px",
    },
  },
}));

export default function PlanList() {
  const classes = useStyles();
  const { activate, account, chainId, library, deactivate } = useWeb3React();
  const user = useContext(UserContext);
  const [loader, setLoader] = useState(true);
  const [isOpenView, setIsOpenView] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [viewPlan, setViewPlan] = useState("");
  const [planDataList, setPlanDataList] = useState([]);
  const handleEditView = async (id) => {
    console.log(id);
    // setViewPlan()
    try {
      const res = await axios({
        method: "get",
        url: ApiConfig.viewSubscriptionPlan,
        params: {
          subscribeId: id._id,
        },
      });
      if (res.data.responseCode == 200) {
        setViewPlan(res.data.result);
        setIsOpenEdit(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const PlansList = async () => {
    try {
      const res = await axios({
        method: "get",
        url: ApiConfig.listSubscriptionPlan,
      });
      if (res.data.responseCode == 200) {
        setPlanDataList(res.data.result);
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };
  useEffect(() => {
    PlansList();
  }, []);

  return (
    <>
      <Box className={classes.mainBox}>

          {!isOpenView && !isOpenEdit && !isOpenAdd && (
            <Box className="mainContainer">
              <Box className={classes.addFarner} mb={2}>
                <Typography variant="h4">Plan Mangement</Typography>
                <Button
                  onClick={() => setIsOpenAdd(true)}
                  variant="contained"
                  color="primary"
                >
                  Add Plan
                </Button>
              </Box>

              <Box pt={2} pb={2}>
                <Divider />
              </Box>

              <Box mt={2}>
                <TableContainer >
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                    <TableRow style={{ backgroundColor: "rgb(8, 86, 204)" }}>
                        <TableCell className="tableCell" align="left">
                          Sr.No
                        </TableCell>
                        <TableCell className="tableCell">Plan Name</TableCell>
                        <TableCell className="tableCell" align="left">
                          Price
                        </TableCell>
                        <TableCell className="tableCell" align="left">
                          Duration
                        </TableCell>

                        <TableCell className="tableCell" align="left">
                          Status
                        </TableCell>

                        <TableCell className="tableCell" align="center">
                          Action
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {planDataList.length > 0 && (
                        <>
                          {planDataList &&
                            planDataList.map((data, index) => (
                              <PlanData
                                data={data}
                                classes={classes}
                                index={index}
                                setIsOpenView={(item) => setIsOpenView(item)}
                                setIsOpenEdit={(item) => setIsOpenEdit(item)}
                                handleEditView={(data) => handleEditView(data)}
                                handleLists={() => PlansList()}
                              />
                            ))}
                        </>
                      )}
                      {planDataList == 0 && !loader && (
                        <span>No Data Found</span>
                      )}
                      {planDataList == 0 && loader && (
                        <ButtonCircularProgress />
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>
          )}

      </Box>

      {isOpenAdd && (
        <AddPlan
          setIsOpenEdit={(data) => setIsOpenAdd(data)}
          type="add"
          data={""}
        />
      )}
      {isOpenEdit && (
        <AddPlan
          setIsOpenEdit={(data) => setIsOpenEdit(data)}
          type="edit"
          data={viewPlan}
        />
      )}
      {isOpenView && (
        <AddPlan
          setIsOpenEdit={(data) => setIsOpenView(data)}
          data={viewPlan}
        />
      )}
    </>
  );
}
