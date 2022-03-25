import React, { useState, useEffect } from "react";
import { Button, message } from "antd";
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

  const [register, setRegister] = useState({
    name: "",
    surname: "",
    user_name: "",
    email: "",
    password: "",
    rePassword: "",
  });

  useEffect(() => {
    LogOut();
  }, []);

  function LogOut() {
    if (localStorage.getItem("userToken")) {
      localStorage.removeItem("userToken");
    }
    removeUser();
  }

  async function authRegister() {
    showLoading();
    await post("auth/register", { ...register }).then((res) => {
      if (res.result) {
        message.success(res.message);
        history.push("/auth/login");
      } else {
        message.error(res.message);
      }
      hideLoading();
    });
  }
  function onKeyPress(e) {
    if (e.which === 13) {
      authRegister();
    }
  }
  return (
    <div className="container-fluid" style={{ height: "100vh" }}>
      <div
        className="row align-items-md-center align-items-start justify-content-center py-3"
        style={{ height: "100vh" }}
      >
        <div className="col-lg-6 col-md-9 col-12">
          <div className="card">
            <div className="card-header">Kayit Ol</div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6 col-12 p-3  pb-md-3 pb-0">
                  <div className="mb-3">
                    <label className="form-label">Ad</label>
                    <input
                      class="form-control"
                      type="text"
                      value={register.name}
                      onChange={(e) =>
                        setRegister({ ...register, name: e.target.value })
                      }
                      onKeyDown={onKeyPress}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Soyad</label>
                    <input
                      class="form-control"
                      type="text"
                      value={register.surname}
                      onChange={(e) =>
                        setRegister({ ...register, surname: e.target.value })
                      }
                      onKeyDown={onKeyPress}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Kullanici Adi</label>
                    <input
                      class="form-control"
                      type="text"
                      value={register.user_name}
                      onChange={(e) =>
                        setRegister({ ...register, user_name: e.target.value })
                      }
                      onKeyDown={onKeyPress}
                    />
                  </div>
                </div>
                <div className="col-md-6 col-12 p-3 pt-md-3 pt-0">
                  <div className="mb-3">
                    <label className="form-label">E-posta</label>
                    <input
                      class="form-control"
                      type="email"
                      value={register.email}
                      onChange={(e) =>
                        setRegister({ ...register, email: e.target.value })
                      }
                      onKeyDown={onKeyPress}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Sifre</label>
                    <input
                      class="form-control"
                      type="password"
                      value={register.password}
                      onChange={(e) =>
                        setRegister({ ...register, password: e.target.value })
                      }
                      onKeyDown={onKeyPress}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Sifre Tekrar</label>
                    <input
                      class="form-control"
                      type="password"
                      value={register.rePassword}
                      onChange={(e) =>
                        setRegister({ ...register, rePassword: e.target.value })
                      }
                      onKeyDown={onKeyPress}
                    />
                  </div>
                </div>
                <div>
                  <Button
                    className="btn btn-primary w-100 mb-3"
                    onClick={authRegister}
                  >
                    Kayit Ol
                  </Button>
                  <div className="text-muted w-100">
                    Zaten bir hesaba sahipmisiniz?
                    <Link
                      to="/auth/login"
                      className="text-primary fw-600 ms-2"
                    >
                      Giris Yap
                    </Link>
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
