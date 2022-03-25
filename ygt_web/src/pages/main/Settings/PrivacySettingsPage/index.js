import React, { useEffect, useState } from "react";
import { MdChevronLeft } from "react-icons/md";
import { showLoading, hideLoading } from "../../../../redux/actions";
import { get, post } from "../../../../helpers/http.helper";
import { Switch, message } from "antd";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

export default function Page() {
  let [account, setAccount] = useState({});
  async function getAccount() {
    showLoading();
    await get("api/account").then((res) => {
      if (res.result) {
        setAccount(res.user);
      } else {
        message.error(res.message);
      }
      hideLoading();
    });
  }
  useEffect(() => getAccount(), []);

  async function savePrivacy(privacy, run) {
    showLoading();
    await post("api/account/privacy", { privacy }).then((res) => {
      if (res.result) {
        message.success(res.message);
        run();
      } else {
        message.error(res.message);
      }
    });
    hideLoading();
  }

  let history = useHistory();
  return (
    <div className="w-100">
      <div className="card" data-aos="fade-up">
        <div className="card-body">
          <div className="d-flex align-items-center mb-4">
            <Link className="pe-2 me-2" onClick={() => history.goBack()}>
              <MdChevronLeft size={32} className=" text-muted" />
            </Link>
            <h6 className="m-0">Gizlilik Ayarlari</h6>
          </div>
          <div className="row">
            <div className="col-12 my-3">
              <Switch
                checked={account.privacy == 1}
                onChange={(checked) => savePrivacy(checked, () => getAccount())}
              />
              <label className="ms-3">Gizli Hesap<small className="ms-3 text-muted">Takip etmeyen kullanicilar sizin bilgilerinizi goruntuleyezler.</small></label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
