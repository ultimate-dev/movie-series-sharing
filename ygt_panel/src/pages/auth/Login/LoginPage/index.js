import React, { useEffect, useState } from "react";
import { RiStarSmileFill } from "react-icons/ri";
import { message } from "antd";
//Actions
import { showLoading, hideLoading, setUser } from "../../../../redux/actions";
//Helpers
import { post } from "../../../../helpers/http.helper";

function LoginPage({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onLogin() {
    showLoading();
    post("/auth/login", { email, password }).then((res) => {
      console.log(res);
      if (res.result) {
        history.push("/panel/dashboard");
        localStorage.setItem("userToken", res.token);
        setUser(res.admin);
      } else {
        message.error(res.message);
        setPassword("");
      }
    });
    hideLoading();
  }

  function onKeyPress(e) {
    //(Enter) Key Press
    if (e.which === 13) {
      onLogin();
    }
  }

  return (
    <div className="login bg-white">
      <div className="wrapper wrapper-login wrapper-login-full p-0">
        <div className="login-aside w-50 d-flex flex-column align-items-center justify-content-center text-center bg-primary-gradient animated fadeInLeft">
          <h1 className="title fw-bold text-white mb-5">Tekrar Hoşgeldin.</h1>
          <p className="subtitle text-white op-6">
            <RiStarSmileFill size={180} />
          </p>
        </div>
        <div className="login-aside w-50 d-flex align-items-center justify-content-center bg-white">
          <div
            className="container container-login container-transparent animated fadeIn"
            style={{ display: "block" }}
          >
            <h3 className="text-center">YÖNETİCİ PANELİ</h3>
            <div className="login-form">
              <div className="form-group">
                <label htmlFor="email" className="placeholder">
                  <b>E-Posta</b>
                </label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  className="form-control"
                  required=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={(e) => onKeyPress(e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password" className="placeholder">
                  <b>Şifre</b>
                </label>
                <div className="position-relative">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className="form-control"
                    required=""
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={(e) => onKeyPress(e)}
                  />
                </div>
              </div>
              <div className="form-group form-action-d-flex mb-3">
                <button
                  className="btn btn-primary btn-block mt-3 mt-sm-0 fw-bold"
                  onClick={() => onLogin()}
                >
                  <span> Giriş Yap</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
