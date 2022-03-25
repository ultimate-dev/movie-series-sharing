import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
//Styles
import "antd/dist/antd.css";
import "animate.css";
import "react-multi-carousel/lib/styles.css";
import 'react-modal-video/scss/modal-video.scss';
import "react-chat-elements/dist/main.css";
import "./assets/scss/style.scss";
//Components
import  RouterScrollReset  from "./components/RouterScrollReset";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <RouterScrollReset>
        <App />
      </RouterScrollReset>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
