import React, { useState, useEffect } from "react";
import { MdChevronLeft } from "react-icons/md";
import { Link, useHistory } from "react-router-dom";
//
import ImagePicker from "../../../../components/ImagePicker";
import { showLoading, hideLoading } from "../../../../redux/actions";
import { get, post } from "../../../../helpers/http.helper";
import { Button, message } from "antd";
import { RiSave2Fill } from "react-icons/ri";

export default function Page() {
  let history = useHistory();

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

  async function saveAccount(run) {
    let formData = new FormData();
    formData.append("back", account.back);
    formData.append("image", account.image);
    formData.append("name", account.name);
    formData.append("surname", account.surname);
    formData.append("user_name", account.user_name);

    showLoading();
    await post("api/account", formData).then((res) => {
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
            <h6 className="m-0">Hesap Ayarlari</h6>
          </div>
          <div className="row">
            <div className="col-md-12 my-3">
              <ImagePicker
                className="w-100"
                value={account?.back}
                onChange={(e) =>
                  setAccount({
                    ...account,
                    back: e,
                    change: true,
                  })
                }
              />
            </div>
            <div className="col-md-4 my-3">
              <ImagePicker
                className="w-100"
                fit="contain"
                value={account?.image}
                onChange={(e) =>
                  setAccount({
                    ...account,
                    image: e,
                    change: true,
                  })
                }
              />
            </div>
            <div className="col-md-8">
              <div className="w-100 my-3">
                <label className="form-label ps-3">Ad</label>
                <input
                  className="form-control"
                  value={account?.name}
                  onChange={(e) =>
                    setAccount({
                      ...account,
                      name: e.target.value,
                      change: true,
                    })
                  }
                />
              </div>
              <div className="w-100 my-3">
                <label className="form-label ps-3">Soyad</label>
                <input
                  className="form-control"
                  value={account?.surname}
                  onChange={(e) =>
                    setAccount({
                      ...account,
                      surname: e.target.value,
                      change: true,
                    })
                  }
                />
              </div>
              <div className="w-100 my-3">
                <label className="form-label ps-3">Kullanici Adi</label>
                <input
                  className="form-control"
                  value={account?.user_name}
                  onChange={(e) =>
                    setAccount({
                      ...account,
                      user_name: e.target.value,
                      change: true,
                    })
                  }
                />
              </div>
            </div>
            <div className="col-12 my-3 d-flex justify-content-end">
              <Button
                className="btn btn-primary"
                disabled={!account?.change}
                onClick={() => saveAccount(() => getAccount())}
              >
                <RiSave2Fill size={20} className="me-2" />
                Kaydet
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
