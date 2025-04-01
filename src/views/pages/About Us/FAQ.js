import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  Typography,
  Container,
  Box,
  Button,
  Grid,
  Paper,
} from "@material-ui/core";
import { AiOutlinePlus } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import FaqData from "src/component/FaqData";

const data = [];
const FaqDataList = [
  {
    head: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ",
    summary: [
      <div>
        <p>
          Yes, you can. You can participate in the events where your racehorse
          is racing. The priority depends on how many shares you own together
          with how much $MAX you have. However, further KYC and identity
          documents support might be needed to fulfil local requirements in
          various horse-racing events.
        </p>
      </div>,
    ],
  },
  {
    head: "Question?",
    // heading: "Why do I need a will or letter of wishes?",
    summary: [
      <div>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged.
        </p>
      </div>,
    ],
  },
  {
    head: "Question?",
    // heading: "Why do I need a will or letter of wishes?",
    summary: [
      <div>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged.
        </p>
      </div>,
    ],
  },
  {
    head: "Question?",
    // heading: "Why do I need a will or letter of wishes?",
    summary: [
      <div>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged.
        </p>
      </div>,
    ],
  },
  {
    head: "Question?",
    // heading: "Why do I need a will or letter of wishes?",
    summary: [
      <div>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged.
        </p>
      </div>,
    ],
  },
  {
    head: "Question?",
    // heading: "Why do I need a will or letter of wishes?",
    summary: [
      <div>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged.
        </p>
      </div>,
    ],
  },
  {
    head: "Question?",
    // heading: "Why do I need a will or letter of wishes?",
    summary: [
      <div>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged.
        </p>
      </div>,
    ],
  },
];
const useStyles = makeStyles((theme) => ({
  root: {
    "& h2": {
      color: "#3D3D3D",
      fontSize: "30px",
      fontWeight: "500",
    },
  },
}));

const FAQ = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState("panel1");
  const [allData, setAllData] = React.useState(data);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const history = useHistory();

  return (
    <div className={classes.root}>
      {/* <Box align="left" className={classes.mainbox}> */}

      <Paper elevation={2} align="left" style={{ padding: "20px" }}>
        <Typography variant="h2">FAQs</Typography>
        <Grid container spacing={1}>
          {FaqDataList.map((data, i) => {
            return (
              <Grid item xs={12} sm={12} md={12} key={i}>
                <FaqData data={data} index={i} />
              </Grid>
            );
          })}
        </Grid>
      </Paper>

      {/* </Box> */}
    </div>
  );
};

export default FAQ;
