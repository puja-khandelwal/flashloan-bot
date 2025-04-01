import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { AppBar, Toolbar, makeStyles, Hidden } from "@material-ui/core";
import { Menu as MenuIcon } from "react-feather";
import { TopBarData } from "./TopBarData";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
    borderRadius: "0px",
    boxShadow: "0 0 34px 0 rgb(94 92 154 / 6%)",
  },
  toolbar: {
    height: 80,
    padding: "0 10px",
    backgroundColor: "#fff",
    borderRadius: "0px !important",
    paddingRight: "51px",
    [theme.breakpoints.down("sm")]: {
      paddingRight: "20px",
    },
  },
  logo: {
    marginRight: theme.spacing(2),
  },
  link: {
    fontWeight: theme.typography.fontWeightMedium,
    "& + &": {
      marginLeft: theme.spacing(2),
    },
  },
  divider: {
    width: 1,
    height: 32,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
}));

const TopBar = ({ className, onMobileNavOpen, ...rest }) => {
  const classes = useStyles();

  return (
    <AppBar className={clsx(classes.root, className)} color="default" {...rest}>
      <Toolbar className={classes.toolbar}>
        <Hidden lgUp>
          <MenuIcon
            style={{
              color: "#f36d36",
              marginRight: "10",
              cursor: "pointer",
            }}
            onClick={onMobileNavOpen}
          />
        </Hidden>
        <TopBarData />
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
};
TopBar.defaultProps = {
  onMobileNavOpen: () => {},
};

export default TopBar;
