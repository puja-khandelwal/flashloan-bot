import React, { useState } from "react";
import {
  TableCell,
  TableRow,
  Avatar,
  Grid,
  Box,
  makeStyles,
  IconButton,
  withStyles,
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { FiCopy } from "react-icons/fi";
import { toast } from "react-toastify";
import { sortAddress } from "src/utils";
import { Cancel, Delete, Edit } from "@material-ui/icons";
import moment from "moment";
import { Tooltip } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import CopyToClipboard from "react-copy-to-clipboard";
import BlockIcon from "@material-ui/icons/Block";
import axios from "axios";
import ApiConfig from "src/config/APICongig";

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(even)": {
      backgroundColor: "#e6e5e885",
    },
    "&:nth-of-type(odd)": {
      backgroundColor: "#ffffff",
    },
  },
}))(TableRow);

export default function PlanData({
  data,
  classes,
  index,
  setIsOpenView,
  setIsOpenEdit,
  handleEditView,
  handleLists,
}) {
  const history = useHistory();
  const [idd1, setidd1] = useState([]);
  const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  // const [tabview, setTabView] = useState("");

  const OpenModal = (id) => {
    setidd1(id);
    setOpen(true);
  };

  const handleDelete = async (deleteData) => {
    try {
      setLoader(true);
      const res = await axios({
        method: "DELETE",
        url: ApiConfig.deleteSubscriptionPlan,
        headers: {
          token:
            sessionStorage.getItem("token") ||
            localStorage.getItem("creatturAccessToken"),
        },
        data: {
          subscribeId: deleteData?._id,
          // transactionHash: "0xdhdfgjahg2j2gaDFjhgjfg4ajfgdsgsdF7",
        },
      });
      if (res.data.responseCode == 200) {
        // setPlanDataList(res.data.result);
        toast.success(res.data.responseMessage);
        handleLists();
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
      if (error.response) {
        toast.success(error.response.data.responseMessage);
      } else {
        toast.success(error.message);
      }
    }
  };

  return (
    <>
      {/* {tabview === "farmerview" ? (
        <ViewFarmerData />
      ) : ( */}
      <StyledTableRow key={data._id}>
        <TableCell component="th" scope="row">
          {index + 1}
        </TableCell>
        <TableCell align="left">{data.name ? data.name : "N/A"}</TableCell>

        <TableCell align="left">{data?.price}</TableCell>
        <TableCell align="left">{data?.months}</TableCell>

        <TableCell
          align="left"
          style={data.status == "BLOCK" ? { color: "red" } : {}}
        >
          {data.status == "BLOCK" ? "Blocked" : "Active"}
        </TableCell>

        <TableCell align="left">
          <Box display="flex">
            <Grid container justify="center">
              <Box item display="flex">
                <Tooltip title="View plan details">
                  <IconButton style={{ padding: "6px 12px" }}>
                    <VisibilityIcon
                      onClick={() => handleEditView(data)}
                      style={{
                        fontSize: "25px",
                        cursor: "pointer",
                        marginRight: "5px",
                      }}
                    />
                  </IconButton>
                </Tooltip>
                {!data.isDelete ? (
                  <Tooltip title="Delete plan details">
                    <IconButton style={{ padding: "6px 12px" }}>
                      <Delete
                        // onClick={() => handleEditView(data)}
                        onClick={() => handleDelete(data)}
                        style={{
                          fontSize: "25px",
                          cursor: "pointer",
                          marginRight: "5px",
                        }}
                        disabled={loader}
                      />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Tooltip title="Plan Deleted">
                    <IconButton style={{ padding: "6px 12px" }}>
                      <Delete
                        // onClick={() => handleEditView(data)}
                        // onClick={() => handleDelete(data)}
                        style={{
                          fontSize: "25px",
                          cursor: "none",
                          marginRight: "5px",
                          color: "red",
                        }}
                        disabled={loader}
                      />
                    </IconButton>
                  </Tooltip>
                )}
              </Box>
            </Grid>
          </Box>
        </TableCell>
      </StyledTableRow>
      {/* )} */}
    </>
  );
}
