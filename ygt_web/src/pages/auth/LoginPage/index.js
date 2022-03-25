import React, { useState, useEffect } from "react";
import { Button, message } from "antd";
import Tilt from "react-parallax-tilt";
import { Link, useHistory } from "react-router-dom";
//* Actions
import {
  showLoading,
  hideLoading,
  removeUser,
  setUser,
} from "../../../redux/actions";
//* Helpers
import { post } from "../../../helpers/http.helper";

export default function Page() {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    LogOut();
  }, []);

  function LogOut() {
    if (localStorage.getItem("userToken")) {
      localStorage.removeItem("userToken");
    }
    removeUser();
  }

  async function authLogin() {
    showLoading();
    await post("auth/login", {
      email,
      password,
    }).then((res) => {
      if (res.result) {
        localStorage.setItem("userToken", res.token);
        setUser(res.user);
        history.push("/home");
      } else {
        message.error(res.message);
      }
      hideLoading();
    });
  }

  function onKeyPress(e) {
    if (e.which === 13) {
      authLogin();
    }
  }

  return (
    <div className="container-fluid" style={{ height: "100vh" }}>
      <div
        className="row align-items-md-center align-items-start justify-content-center py-3"
        style={{ height: "100vh" }}
      >
        <div className="col-lg-6 col-md-8 col-12">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-6 col-12 p-3">
                  <Tilt className="position-relative h-100">
                    <img
                      className="w-100 h-100 rounded"
                      src="https://images.pexels.com/photos/4065578/pexels-photo-4065578.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                      style={{ objectFit: "cover" }}
                    />
                    <Link
                      to="/main/home"
                      className="w-100 h-100"
                      style={{ position: "absolute", left: 0, top: 0 }}
                    ></Link>
                  </Tilt>
                </div>
                <div className="col-md-6 col-12 p-3">
                  <div className="mb-3">
                    <label className="form-label">E-posta</label>
                    <input
                      class="form-control"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={onKeyPress}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Sifre</label>
                    <input
                      class="form-control"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyDown={onKeyPress}
                    />
                  </div>
                  <div>
                    <Button
                      className="btn btn-primary w-100 mb-3"
                      onClick={authLogin}
                    >
                      Giris Yap
                    </Button>
                    <div className="text-muted w-100">
                      Aramiza katilmaya ne dersin?
                      <Link
                        to="/auth/register"
                        className="text-primary fw-600 ms-2"
                      >
                        Kayit Ol
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

