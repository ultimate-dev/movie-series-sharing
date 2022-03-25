import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Content } from "../../../../components";
import { RiAdminFill, RiLock2Fill } from "react-icons/ri";
//Helpers
import { get, post } from "../../../../helpers/http.helper";
import { message } from "antd";
import { hideLoading, showLoading } from "../../../../redux/actions";

function Page({ Header, history }) {
  const [change, setChange] = useState(false);
  const [step, setStep] = useState(0);
  const [admin, setAdmin] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });
  const _admin = useSelector((state) => state.userReducer.user);

  async function getAdmin() {
    showLoading();
    await get("api/admin").then((res) => {
      if (res.result) {
        setAdmin(res.admin);
      } else {
        message.error(res.message);
      }
      hideLoading();
    });
  }

  async function updateAdmin() {
    showLoading();
    await post("api/admin", admin).then((res) => {
      if (res.result) {
        message.success(res.message);
        history.push("/auth/login");
      } else {
        message.error(res.message);
        setStep(0);
        setAdmin({ ...admin, password: "" });
      }
      hideLoading();
    });
  }

  useEffect(() => {
    getAdmin();
  }, []);

  return (
    <div className="page-inner">
      <Header.Breadcrumb
        breadcrumb={[]}
        head="Profilim"
        desc="E-posta adresinizi değiştirerek hatrılayabileceğiniz bir e-posta adresi girebilirsiniz."
      />
      <Content>
        <div className="row align-self-stretch">
          <div className="col-md-8" style={{ height: "100%" }}>
            <div className="card">
              <div className="card-body">
                <div className="w-100 d-flex">
                  <div
                    className={
                      "p-2 mr-2 flex-1 text-center rounded" +
                      (step == 0 ? " bg-primary text-white" : " bg-gray")
                    }
                  >
                    <RiAdminFill size={32} />
                  </div>
                  <div
                    className={
                      "p-2 ml-3 flex-1 text-center rounded" +
                      (step == 1 ? " bg-primary text-white" : " bg-gray")
                    }
                  >
                    <RiLock2Fill size={32} />
                  </div>
                </div>
                {step == 0 ? (
                  <div className="w-100">
                    <div className="row mt-4">
                      <div className="col-md-6">
                        <div className="form-group form-group-default">
                          <label>İsim</label>
                          <input
                            className="form-control"
                            value={admin.name}
                            onChange={(e) => {
                              setAdmin({
                                ...admin,
                                name: e.target.value,
                              });
                              setChange(true);
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group form-group-default">
                          <label>Soyisim</label>
                          <input
                            className="form-control"
                            value={admin.surname}
                            onChange={(e) => {
                              setAdmin({
                                ...admin,
                                surname: e.target.value,
                              });
                              setChange(true);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-12">
                        <div className="form-group form-group-default">
                          <label>Email</label>
                          <input
                            className="form-control"
                            value={admin.email}
                            onChange={(e) => {
                              setAdmin({
                                ...admin,
                                email: e.target.value,
                              });
                              setChange(true);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="text-right mt-3 mb-3">
                      <button
                        className="btn btn-primary"
                        disabled={change ? false : true}
                        onClick={() => {
                          setStep(1);
                          setChange(false);
                        }}
                      >
                        İleri
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="w-100">
                    <div className="row mt-4">
                      <div className="col-md-12">
                        <div className="alert alert-warning">
                          İşleme Devam Etmek İçin Lütfen Şifrenizi Giriniz.
                        </div>
                        <div className="form-group form-group-default">
                          <label>Şifre</label>
                          <input
                            type="password"
                            className="form-control"
                            value={admin.password}
                            onChange={(e) => {
                              setAdmin({
                                ...admin,
                                password: e.target.value,
                              });
                              setChange(true);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="text-right mt-3 mb-3">
                      <button
                        className="btn btn-primary"
                        disabled={change ? false : true}
                        onClick={updateAdmin}
                      >
                        Kaydet
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-4" style={{ height: "100%" }}>
            <div className="card card-profile">
              <div
                className="card-header"
                style={{
                  backgroundImage:
                    "url(https://images.pexels.com/photos/2400594/pexels-photo-2400594.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)",
                }}
              >
                <div className="profile-picture">
                  <div className="avatar avatar-xl">
                    <span className="avatar-title rounded bg-primary">
                      <b>{_admin.letters}</b>
                    </span>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="user-profile text-center">
                  <div className="name">
                    {_admin.name + " " + _admin.surname}
                  </div>
                  <div className="job mb-4">{_admin.email}</div>
                  <div className="view-profile">
                    <Link
                      className="btn btn-gray btn-block"
                      to="/panel/settings"
                    >
                      Şifremi Değiştir
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Content>
    </div>
  );
}

export default withRouter(Page);
