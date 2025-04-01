import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  faqmainBox: {
    border: "1px solid #14133b17",
    borderRadius: "5px !important",
    "& .MuiAccordion-root.Mui-expanded": {},
  },
}));
const Accordion = withStyles({
  root: {
    "&:not(:last-child)": {
      background: "#000",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.12)",
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      border: " 1px solid #3d3d3d",
      background:
        "linear-gradient( 152.97deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)",
      backdropFilter: "blur(42px)",
    },
  },
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    boxSizing: "border-box",
    borderRadius: "4px",
    backdropFilter: "blur(4px)",
    backgroundColor: "rgb(65, 22, 67)",
    // border: "1px solid #F0F0F0",
    color: "red",
    "&$expanded": {
      minHeight: 50,
      borderBottom: "0",
      color: "#FFF ",
      backgroundColor: "rgb(65, 22, 67)",
      borderRadius: "5px 5px 0 0",
      // backgroundColor: "transparent",
      border: " none !important",
    },
    "@media(max-width:605px)": {
      fontSize: "10px",
      minHeight: 50,
      "&$expanded": {
        minHeight: 40,
        borderBottom: "0",
        color: "#FFF",

        border: " none !important",
      },
    },
  },
  content: {
    background: "000 !important",
    borderRadius: "5px",
    // background-color: transparent;
    // border: none !important;
    "&$expanded": {
      margin: "0px 0",
      // backgroundColor: "transparent",
      border: " none !important",
    },
  },
  expanded: {
    margin: "0",
  },
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  expanded: {
    backgroundColor: "rgba(61, 61, 61, 0.8)", // Change the background color when expanded
  },
  root: {
    marginTop: "0px",
    borderRadius: "5px",
    backgroundColor: "#fff",
    "& h6": {
      color: "rgba(61, 61, 61, 1)",
      paddingBottom: "15px",
      "@media (max-width:767px)": {
        fontSize: "18px !important",
      },
    },
    "& p": {
      color: "rgba(61, 61, 61, 1)",
      marginTop: "2px",

      fontSize: "16px",
      fontWeight: "400",
      lineHeight: "24px",
    },
  },
}))(MuiAccordionDetails);

export default function FaqData({ data, index }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Box className={classes.faqmainBox}>
      <Accordion
        style={{ border: "1px solid #14133b17", borderRadius: "5px" }}
        square
        defaultExpanded={index == 0 ? true : false}
        // defaultExpanded={false}
        onChange={handleChange(index)}
      >
        <AccordionSummary
          aria-controls={index}
          expandIcon={
            expanded === index ? (
              <AiOutlineMinus
                style={{
                  fontSize: "20px",
                  fontWeight: "400",

                  color: "#fff",
                }}
              />
            ) : (
              <AiOutlinePlus
                style={{
                  fontSize: "20px",
                  fontWeight: "400",

                  color: "#fff",
                }}
              />
            )
          }
        >
          <Typography
            variant="h5"
            style={{
              fontSize: "20px",
              lineHeight: "25px",
            }}
            // className="faqtextheader"
          >
            {data.head}
          </Typography>
        </AccordionSummary>
        <AccordionDetails style={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="body2">{data.summary}</Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
