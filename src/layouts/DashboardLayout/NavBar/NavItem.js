import React, { useState } from "react";
import { NavLink as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Button, Collapse, ListItem, makeStyles } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import Logo from "src/component/Logo";
import { TbExchange } from "react-icons/tb";

const useStyles = makeStyles((theme) => ({
  item: {
    display: "block",
    paddingTop: 0,
    paddingBottom: 0,
  },
  itemLeaf: {
    display: "flex",
    paddingTop: "0",
    paddingBottom: "0",
    flexDirection: "column",
  },
  button: {
    color: "#0c0d31",
    padding: "10px 8px",
    justifyContent: "flex-start",
    display: "inline",

    textTransform: "none",
    letterSpacing: 0,
    width: "100%",
  },
  buttonLeaf: {
    color: "rgba(61, 61, 61, 1)",
    padding: "10px 8px",
    justifyContent: "flex-start",
    textTransform: "none",
    letterSpacing: 0,
    width: "100%",
    fontSize: "15px",
    display: "block",
    textAlign: "left",
    fontFamily: "'League Spartan', sans-serif",
    "&.depth-0": {
      textAlign: "left",
      alignItems: "center",
      borderLeftWidth: "2px",
      cursor: "pointer",
      display: "flex",
      justifyContent: "space-between",
      padding: "0.75rem 1.5rem",
      width: "100%",
      borderRadius: "0px",
      marginBottom: "5px",
      "&:hover": {
        color: "blue",
        background:
          "linear-gradient(90deg, rgba(54, 243, 98, 0.6) 0%, rgba(63, 243, 54, 0.19) 50%, rgba(54, 243, 92, 0.56) 100%)",
        fontWeight: "400",
        "& $title": {
          fontWeight: "400",
          color: "blue !important",
        },
        "& $icon": {
          color: "blue !important",
        },
      },
      "& $title": {
        fontWeight: "400",
        textAlign: "center",
      },
    },
  },
  maintitle: {
    color: "rgba(61, 61, 61, 1)",
    paddingLeft: "33px",
    marginBottom: "8px",
    fontSize: "15px",
  },
  icon: {
    display: "flex",
    // width: "32px",
    alignItems: "center",

    padding: "5px",
    // fontSize: "8px",
    width: "22px",
    color: "rgba(61, 61, 61, 1)",
    "&:hover": {
      color: "#fff !important",
    },
  },
  title: {
    marginRight: "auto",
    color: "rgba(61, 61, 61, 1)",
    whiteSpace: "pre",
  },
  active: {
    color: "blue",
    background:
      "linear-gradient(90deg, rgba(54, 243, 98, 0.6) 0%, rgba(63, 243, 54, 0.19) 50%, rgba(54, 243, 92, 0.56) 100%)",

    fontWeight: "400",
    "& $title": {
      fontWeight: "400",
      color: "blue !important",
    },
    "& $icon": {
      color: "blue  !important",
    },
  },
}));

const NavItem = ({
  children,
  className,
  depth,
  href,
  icon: Icon,
  info: Info,
  open: openProp,
  title,
  title1,
  ...rest
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(openProp);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  let paddingLeft = 8;

  if (depth > 0) {
    paddingLeft = 32 + 15 * depth;
  }

  const style = { paddingLeft };

  if (children) {
    return (
      <ListItem
        className={clsx(classes.item, className)}
        disableGutters
        key={title}
        {...rest}
      >
        <Button
          className={classes.button}
          onClick={handleToggle}
          style={{ paddingLeft: "15px" }}
        >
          {Icon && <Icon className={classes.icon} size="20" />}
          <span className={classes.title}>{title}</span>
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </Button>
        <Collapse in={open}>{children}</Collapse>
      </ListItem>
    );
  }

  return (
    <ListItem
      className={clsx(classes.itemLeaf, className)}
      disableGutters
      key={title}
      {...rest}
    >
      {/* <span className={classes.maintitle}>{title1}</span> */}
      <Button
        activeClassName={classes.active}
        className={clsx(classes.buttonLeaf, `depth-${depth}`)}
        component={RouterLink}
        exact
        style={style}
        to={href}
      >
        {Icon && <Icon className={classes.icon} size="20" />}
        <span className={classes.title}>{title}</span>
        {Info && <Info />}
      </Button>
    </ListItem>
  );
};

NavItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  depth: PropTypes.number.isRequired,
  href: PropTypes.string,
  icon: PropTypes.elementType,
  info: PropTypes.elementType,
  open: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

NavItem.defaultProps = {
  open: false,
};

export default NavItem;
