import React, { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

const setSession = (accessToken) => {
  if (accessToken) {
    sessionStorage.setItem("token", accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    sessionStorage.removeItem("token");
    delete axios.defaults.headers.common.Authorization;
  }
};

function checkLogin() {
  const accessToken = window.sessionStorage.getItem("token");
  return accessToken ? true : false;
}

export default function AuthProvider(props) {
  const [isLogin, setIsLogin] = useState(checkLogin());
  const [userData] = useState({});

  let data = {
    userLoggedIn: isLogin,
    userData,
    userLogIn: (type, data) => {
      setSession(data);
      setIsLogin(type);
    },
  };

  return (
    <AuthContext.Provider value={data}>{props.children}</AuthContext.Provider>
  );
}
