import React, { useState, useEffect } from "react";
import { message } from "antd";
import { useHistory, useLocation } from "react-router";
//* Routes
import Routes from "./routes";
//
import Navbar from "./Navbar";
import Leftbar from "./Leftbar";
import Rightbar from "./Rightbar";
//* Actions
import {
  showLoading,
  hideLoading,
  setUser,
  removeUser,
} from "../../redux/actions";
//* Helpers
import { post } from "../../helpers/http.helper";
import Footer from "./Footer";

export default function MainLayout() {
  const [verify, setVerify] = useState(true);
  let location = useLocation();
  let history = useHistory();

  //Verify
  useEffect(() => {
    onVerify();
  }, [location.pathname]);

  async function onVerify() {
    showLoading();
    let token = localStorage.getItem("userToken");

    await post("auth/verify", { token }).then((res) => {
      if (res.result) {
        setVerify(true);
        setUser(res.user);
        localStorage.setItem("userToken", res.token);
      } else {
        setVerify(false);
        removeUser();
        localStorage.removeItem("userToken");
        message.error(res.message);
        history.push("/auth/login");
      }
    });

    hideLoading();
  }
  if (verify)
    return (
      <div className="app-main">
        <Navbar />
        <div className="app-main-container">
          <Leftbar />
          <div className="app-main-content">
            <Routes verif={verify} />
          </div>
          <Rightbar />
        </div>
        <Footer />
      </div>
    );
  else return null;
}
