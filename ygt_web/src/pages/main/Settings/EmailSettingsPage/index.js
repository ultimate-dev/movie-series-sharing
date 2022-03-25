import { Button, message } from "antd";
import React, { useState } from "react";
import { MdChevronLeft } from "react-icons/md";
import { RiSave2Fill } from "react-icons/ri";
import { Link, useHistory } from "react-router-dom";
import { post } from "../../../../helpers/http.helper";
import { hideLoading, showLoading } from "../../../../redux/actions";

export default function Page() {
  let [email, setEmail] = useState({});
  let history = useHistory();

  async function changeEmail(run) {
    showLoading();
    await post("api/account/email", { ...email }).then((res) => {
      if (res.result) {
        message.success(res.message);
        run();
      } else {
        message.error(res.message);
      }
    });
    hideLoading();
  }

  return (
    <div className="w-100">
      <div className="card" data-aos="fade-up">
        <div className="card-body">
          <div className="d-flex align-items-center mb-4">
            <Link className="pe-2 me-2" onClick={() => history.goBack()}>
              <MdChevronLeft size={32} className=" text-muted" />
            </Link>
            <h6 className="m-0">E-Posta Degistir</h6>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="w-100 my-3">
                <label className="form-label ps-3">Mevcut E-Posta</label>
                <input
                  className="form-control"
                  type="email"
                  value={email?.current_email}
                  onChange={(e) =>
                    setEmail({
                      ...email,
                      current_email: e.target.value,
                      change: true,
                    })
                  }
                />
              </div>
              <div className="w-100 my-3">
                <label className="form-label ps-3">Yeni E-Posta</label>
                <input
                  className="form-control"
                  type="email"
                  value={email?.new_email}
                  onChange={(e) =>
                    setEmail({
                      ...email,
                      new_email: e.target.value,
                      change: true,
                    })
                  }
                />
              </div>
              <div className="col-12 my-3 d-flex justify-content-end">
                <Button
                  className="btn btn-primary"
                  disabled={!email?.change}
                  onClick={() => changeEmail(() => history.push("/auth/login"))}
                >
                  <RiSave2Fill size={20} className="me-2" />
                  Kaydet
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
