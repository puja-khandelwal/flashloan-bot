import React, { lazy } from "react";
import { Redirect } from "react-router-dom";
import HomeLayout from "src/layouts/HomeLayout";
import DashboardLayout from "src/layouts/DashboardLayout";
import LoginLayout from "src/layouts/LoginLayout";
export const routes = [
  {
    exact: true,
    path: "/",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Home/index")),
  },
  //Exchange

  {
    // exact: true,
    path: "/login",
    layout: LoginLayout,
    component: lazy(() => import("src/views/pages/Auth/Login/Index")),
  },

  {
    // exact: true,
    path: "/Signup",
    layout: LoginLayout,
    component: lazy(() => import("src/views/pages/Auth/Signup/Index")),
  },

  {
    // exact: true,
    path: "/Forgot",
    layout: LoginLayout,
    component: lazy(() => import("src/views/pages/Auth//Forgot/Index")),
  },

  {
    // exact: true,
    path: "/Reset",
    layout: LoginLayout,
    component: lazy(() => import("src/views/pages/Auth//Reset/Index")),
  },
  {
    // exact: true,
    path: "/Verify-Otp",
    layout: LoginLayout,
    component: lazy(() => import("src/views/pages/Auth//Verify/Index")),
  },
  {
    exact: true,
    path: "/exchange",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Home/Exchange")),
  },
  {
    exact: true,
    path: "/cross-exchange",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/CrossExchange/Index")),
  },

  {
    exact: true,
    path: "/cross-exchange-more",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/CrossExchangeMore/Index")),
  },
  {
    exact: true,
    path: "/white-paper",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/WhitePaper/WhitePaper")),
  },
  {
    exact: true,
    path: "/404",
    component: lazy(() => import("src/views/errors/NotFound")),
  },

  {
    exact: true,
    path: "/deploy",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Deploy/Index")),
  },
  {
    exact: true,
    path: "/wallet",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Wallet/Index")),
  },

  {
    exact: true,
    path: "/about",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/About Us/AboutUs")),
  },
  {
    exact: true,
    path: "/policy",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/About Us/Policy")),
  },
  {
    exact: true,
    path: "/terms",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/About Us/Terms")),
  },
  {
    exact: true,
    path: "/faqs",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/About Us/FAQ")),
  },

  {
    exact: true,
    path: "/autotrade",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Autotrade/Index")),
  },
  {
    exact: true,
    path: "/market",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Market/Index")),
  },
  {
    exact: true,
    path: "/dashboard",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Dasboard/Index")),
  },
  {
    exact: true,
    path: "/profile",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/EditProfile/Profile")),
  },
  {
    exact: true,
    path: "/edit-profile",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/EditProfile/EditProfile")),
  },

  {
    exact: true,
    path: "/plan",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Plan/PlanList")),
  },

  // {
  //   exact: true,
  //   path: "/chart",
  //   layout: DashboardLayout,
  //   component: lazy(() => import("src/views/pages/Dasboard/Chart")),
  // },
  {
    exact: true,
    path: "/bot-settings",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/BotSettings/Index")),
  },
  {
    exact: true,
    path: "/change-password",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Auth/ChangePassword/index")),
  },
  {
    exact: true,
    path: "/notification",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Notification/Notification")),
  },
  {
    exact: true,
    path: "/transaction",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Transactions/Transaction")),
  },

  {
    exact: true,
    path: "/demo",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Statics/Demo")),
  },
  {
    exact: true,
    path: "/statistics",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Statics/Index")),
  },
  {
    exact: true,
    path: "/profit-opportunities",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Profit/Index")),
  },
  {
    exact: true,
    path: "/subscription",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Subscriptions/LoginSubscription")
    ),
  },
  {
    exact: true,
    path: "/two-factor-authentication",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/TwoFAAuthentication/index")),
  },
  {
    exact: true,
    path: "/google-authentication",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/TwoFAAuthentication/GoogleAuthentication")
    ),
  },
  {
    exact: true,
    path: "/email-authentication",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/TwoFAAuthentication/EmailAuthentication")
    ),
  },
  // {
  //   exact: true,
  //   path: "/subscription",
  //   layout: DashboardLayout,
  //   component: lazy(() => import("src/views/pages/Subscriptions/Index")),
  // },
  {
    exact: true,
    path: "/contact-us",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/StaticPages/ContactUs")),
  },
  {
    component: () => <Redirect to="/404" />,
  },
];
