import React, { useState, useEffect } from "react";
//Components
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Article from "./Article";
import Footer from "./Footer";
//Routes
import Routes from "./routes";
//Helpers
import { post } from "../../helpers/http.helper";
import { message } from "antd";
import { hideLoading, setUser, showLoading } from "../../redux/actions";

function PanelLayout({ history, location }) {
  //Status
  const [minimaze, setMinimaze] = useState(false);
  const [minimazeHover, setMinimazeHover] = useState(false);
  const [topbar, setTopbar] = useState(false);
  //Verify
  const [verify, setVerify] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      showLoading();
      post("/auth/verify", {
        token: localStorage.getItem("userToken"),
      }).then((res) => {
        if (res.result) {
          setUser(res.admin);
          setVerify(true);
        } else {
          message.error(res.message);
          history.push("/auth/login");
        }
        hideLoading();
      });
    } else {
      message.error("Lütfen Giriş Yapınız.");
      history.push("/auth/login");
    }
  }, [location.pathname]);

  if (verify) {
    let wrapperClass = "wrapper";
    /**Minimaze */
    if (minimaze) {
      wrapperClass += " sidebar_minimize nav_open";
    }
    /**Hover Minimaze */
    if (minimazeHover) {
      wrapperClass += " sidebar_minimize_hover";
    }
    /**TopBar */
    if (topbar) {
      wrapperClass += " topbar_open";
    }

    return (
      <div className={wrapperClass}>
        <Navbar
          onMinimaze={() => setMinimaze(!minimaze)}
          onTopbar={() => setTopbar(!topbar)}
        />
        <Sidebar onMinimazeHover={(hover) => setMinimazeHover(hover)} />
        <div className="main-panel app-panel">
          <Article>
            <Routes />
          </Article>
          <Footer />
        </div>
      </div>
    );
  } else {
    return null;
  }
}
export default PanelLayout;
