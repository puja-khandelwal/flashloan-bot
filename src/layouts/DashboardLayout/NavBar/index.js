/* eslint-disable no-use-before-define */
import React, { useEffect, useContext, useState } from "react";
import { useLocation, matchPath } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import {
  Box,
  Drawer,
  Hidden,
  List,
  ListSubheader,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { RiDashboard2Fill } from "react-icons/ri";
import { AiOutlineLogout } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { IoWalletOutline } from "react-icons/io5";
import { TbExchange } from "react-icons/tb";
import { AiOutlineTransaction } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineSubscriptions, MdDashboard } from "react-icons/md";
import { useHistory } from "react-router-dom";
import NavItem from "./NavItem";
import { UserContext } from "src/context/User";
import { toast } from "react-toastify";
import { AuthContext } from "src/context/Auth";
import ConfirmationModal from "src/component/ConfirmationModal";
import { VscGraph } from "react-icons/vsc";

const sections = [
  {
    items: [
      {
        title: "Dashboard",
        title1: "Dashboard",
        icon: MdDashboard,
        href: "/dashboard",
      },
      // {
      //   title: "Deploy Contract",
      //   title1: "Contract",
      //   icon: RiDashboard2Fill,
      //   href: "/deploy",
      // },
      // {
      //   title: "Wallets",
      //   title1: "Wallet",
      //   icon: IoWalletOutline,
      //   href: "/wallet",
      // },
      {
        title: "Profile Path",
        title1: "Exchange",
        icon: TbExchange,
        href: "/market",
      },
      // {
      //   title: "Auto Trade Settings",
      //   title1: "Settings",
      //   icon: IoSettingsOutline,
      //   href: "/autotrade",
      // },
      {
        title: "Profile",
        title1: "Settings",
        icon: FaRegUser,
        // href: "/edit-profile",
        href: "/profile",
      },
      {
        title: "Statistics",
        title1: "Statistics",
        icon: VscGraph,
        href: "/statistics",
      },
      // {
      //   title: "Subscription",
      //   title1: "Subscription",
      //   icon: MdOutlineSubscriptions,
      //   href: "/subscription",
      // },
      // {
      //   title: "Market",
      //   title1: "Market",
      //   icon: RiDashboard2Fill,
      //   href: "/market",
      // },
      {
        title: "Transaction",
        title1: "Transaction",
        icon: AiOutlineTransaction,
        href: "/transaction",
      },
      // {
      //   title: "Market",
      //   title1: "Contract",
      //   icon: RiDashboard2Fill,
      //   href: "/market",
      // },
      // {
      //   title: "Plan",
      //   icon: MdOutlineSubscriptions,
      //   href: "/plan",
      // },
    ],
  },
];
const AdminSections = [
  {
    items: [
      {
        title: "Plan",
        icon: MdOutlineSubscriptions,
        href: "/plan",
      },
    ],
  },
];
function renderNavItems({ items, pathname, depth = 0 }) {
  return (
    <List disablePadding>
      {items.reduce(
        (acc, item) => reduceChildRoutes({ acc, item, pathname, depth }),
        []
      )}
    </List>
  );
}

function reduceChildRoutes({ acc, pathname, item, depth }) {
  const key = item.title + depth;

  if (item.items) {
    //eslint-disable-next-line
    const open = matchPath(pathname, {
      path: item.href,
      exact: false,
    });

    acc.push(
      <NavItem
        depth={depth}
        icon={item.icon}
        info={item.info}
        key={key}
        open={Boolean()}
        title={item.title}
        title1={item.title1}
      >
        {renderNavItems({
          depth: depth + 1,
          pathname,
          items: item.items,
        })}
      </NavItem>
    );
  } else {
    acc.push(
      <NavItem
        depth={depth}
        href={item.href}
        icon={item.icon}
        info={item.info}
        key={key}
        title={item.title}
        title1={item.title1}
      />
    );
  }

  return acc;
}

const useStyles = makeStyles((theme) => ({
  mobileDrawer: {
    width: 256,
    borderRadius: "0px !important",
    // background: theme.palette.primary.main,
  },
  desktopDrawer: {
    width: 200,
    top: 80,
    borderRadius: "0px !important",
    height: "calc(100% - 80px)",
    boxShadow: "none",
    backgroundColor: "#fff",
  },
  avatar: {
    cursor: "pointer",
    width: 64,
    height: 64,
  },
  socialIcon: {
    cursor: "pointer",
    marginRight: 5,
  },
  logo: {
    width: "auto",
    cursor: "pointer",
    paddingTop: "3px",
    maxWidth: "87px",
    paddingLeft: "11px",
  },
  contentBox: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.primary.paper,
    [theme.breakpoints.down("md")]: {
      marginTop: "-22px",
    },
  },
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();

  const history = useHistory();
  const location = useLocation();
  const [isLogout, setIsLogout] = useState(false);
  const user = useContext(UserContext);
  const UserType = user?.userData?.userType;

  const logoutFunction = () => {
    toast.success("You have been logout successfully!");
    window.sessionStorage.removeItem("token");
    window.localStorage.removeItem("arbitage");
    user.userLogIn(false, null);
    setIsLogout(false);
    history.push("/");
  };

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Box height="100%" display="flex" flexDirection="column">
        <Box className={classes.contentBox}>
          <PerfectScrollbar options={{ suppressScrollX: true }}>
            <Box py={4}>
              {/* <img src="./images/dashboard_logo.svg" alt="" className="src" /> */}
              {sections.map((section, i) => {
                return (
                  <List
                    key={`menu${i}`}
                    subheader={
                      <ListSubheader disableGutters disableSticky>
                        {section.subheader}
                      </ListSubheader>
                    }
                  >
                    {renderNavItems({
                      items: section.items,
                      pathname: location.pathname,
                    })}
                  </List>
                );
              })}

              <Box
                className="displayStart"
                pl={1.3}
                onClick={() => setIsLogout(true)}
                style={{ cursor: "pointer" }}
              >
                <AiOutlineLogout
                  style={{
                    color: "rgb(61, 61, 61)",
                    padding: "5px",
                    fontSize: "21px",
                  }}
                />
                <Typography
                  variant="body2"
                  style={{ color: "rgba(61, 61, 61, 1)", marginLeft: "5px" }}
                >
                  Logout
                </Typography>
              </Box>
              <Box
                style={{ position: "absolute", left: "20px", bottom: "60px" }}
              >
                <Typography
                  variant="body2"
                  onClick={() => history.push("/faqs")}
                  style={{ color: " rgba(65, 22, 67, 1)", cursor: "pointer" }}
                >
                  FAQs
                </Typography>
                <Typography
                  variant="body2"
                  onClick={() => history.push("/policy")}
                  style={{ color: " rgba(65, 22, 67, 1)", cursor: "pointer" }}
                >
                  Privacy Policy
                </Typography>
                <Typography
                  variant="body2"
                  onClick={() => history.push("/terms")}
                  style={{ color: " rgba(65, 22, 67, 1)", cursor: "pointer" }}
                >
                  Terms of Use
                </Typography>
              </Box>
              {UserType == "Admin" && (
                <>
                  {AdminSections.map((section, i) => {
                    return (
                      <List
                        key={`menu${i}`}
                        subheader={
                          <ListSubheader disableGutters disableSticky>
                            {section.subheader}
                          </ListSubheader>
                        }
                      >
                        {renderNavItems({
                          items: section.items,
                          pathname: location.pathname,
                        })}
                      </List>
                    );
                  })}
                </>
              )}
            </Box>
          </PerfectScrollbar>
        </Box>
      </Box>
      {isLogout && (
        <ConfirmationModal
          open={isLogout}
          isLoading={false}
          handleClose={() => {
            setIsLogout(false);
          }}
          title={"Logout"}
          desc={"Are you sure, you want to logout?"}
          handleSubmit={(item) => logoutFunction(item)}
        />
      )}
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          <img
            src="./images/logo.svg"
            alt="image"
            className={classes.logo}
            onClick={() => history.push("/")}
          />
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

export default NavBar;
