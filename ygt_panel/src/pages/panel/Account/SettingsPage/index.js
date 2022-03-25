import React, { useState } from "react";

import { withRouter } from "react-router";
import { Content } from "../../../../components";
//Actions
import { showLoading, hideLoading } from "../../../../redux/actions";
//Helpers
import { post } from "../../../../helpers/http.helper";
import { message } from "antd";

function Page({ Header, history }) {
  const [change, setChange] = useState(false);
  const [pass, setPass] = useState({
    current_pass: "",
    new_pass: "",
    new_re_pass: "",
  });

  async function updatePassword() {
    showLoading();
    await post("api/admin/pass", pass).then((res) => {
      if (res.result) {
        message.success(res.message);
        history.push("/auth/login");
      } else {
        message.error(res.message);
      }
      hideLoading();
    });
  }

  return (
    <div className="page-inner">
      <Header.Breadcrumb breadcrumb={[]} head="Ayarlar" desc="Özelliklede ilk girişinizde şifrenizi değiştirmebilirsiniz. Şifrenizi Daha rahat hatırlayacağınız bir şifre yapabilirsiniz" />
      <Content>
        <div className="row align-self-stretch">
          <div className="col-md-8 offset-md-2" style={{ height: "100%" }}>
            <div className="card">
              <div className="card-header">
                <div className="h3">Şiremi Değiştir</div>
              </div>
              <div className="card-body">
                <div className="w-100">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group form-group-default">
                        <label>Mevcut Şifre</label>
                        <input
                          type="password"
                          className="form-control"
                          value={pass.current_pass}
                          onChange={(e) => {
                            setPass({
                              ...pass,
                              current_pass: e.target.value,
                            });
                            setChange(true);
                          }}
                        />
                      </div>
                    </div>
                    {pass.new_pass.length >= 8 ? null : (
                      <div className="col-md-12">
                        <div className="alert alert-warning">
                          Şifreniz En Az 8 Karakterden Oluşmalıdır.
                        </div>
                      </div>
                    )}

                    <div className="col-md-12">
                      <div className="form-group form-group-default">
                        <label>Yeni Şifre</label>
                        <input
                          type="password"
                          className="form-control"
                          value={pass.new_pass}
                          onChange={(e) => {
                            setPass({
                              ...pass,
                              new_pass: e.target.value,
                            });
                            setChange(true);
                          }}
                        />
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="form-group form-group-default">
                        <label>Yeni Şifre Tekrar</label>
                        <input
                          type="password"
                          className="form-control"
                          value={pass.new_re_pass}
                          onChange={(e) => {
                            setPass({
                              ...pass,
                              new_re_pass: e.target.value,
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
                      disabled={
                        change ? (pass.new_pass.length >= 8 ? false : true) : true
                      }
                      onClick={updatePassword}
                    >
                      Kaydet
                    </button>
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
