import { message, Modal, Button } from "antd";
import React, { useEffect, useState } from "react";
import { RiFileCopyFill, RiRefreshLine, RiAddCircleFill } from "react-icons/ri";
import { CopyToClipboard } from "react-copy-to-clipboard";
//Utiliates
import randomInterval from "../../../../utilities/randomInterval";
//Components
import DataTable from "./DataTable";
import { Content } from "../../../../components";
//Helpers
import { get, del, put } from "../../../../helpers/http.helper";
//Actions
import {
  hideLoading,
  showDialog,
  showLoading,
} from "../../../../redux/actions";

export default function Page({ Header }) {
  const [managers, setManagers] = useState([]);
  const [addValues, setAddValues] = useState({
    visible: false,
  });

  async function getManagers() {
    showLoading();
    await get("api/managers").then((res) => {
      if (res.result) {
        setManagers(res.managers);
      } else {
        message.error(res.message);
      }
      hideLoading();
    });
  }

  async function deleteManager(id, run) {
    showLoading();
    await del("api/managers", { admin_id: id }).then((res) => {
      if (res.result) {
        message.success(res.message);
        run();
      } else {
        message.error(res.message);
      }
      hideLoading();
    });
  }

  async function createManager(run) {
    showLoading();
    await put("api/managers", { ...addValues }).then((res) => {
      if (res.result) {
        message.success(res.message);
        run();
      } else {
        message.error(res.message);
      }
      hideLoading();
    });
  }

  useEffect(() => {
    getManagers();
  }, []);

  return (
    <div className="page-inner">
      <Header.Breadcrumb
        head="Yöneticiler"
        desc="Yönetici ekleyebilir ve silebilirsiniz."
      />
      <Content>
        <div className="row">
          <div className="col-md-12">
            <div className="card full-height">
              <div className="card-body">
                <div className="text-right mb-3">
                  <Button
                    className="btn btn-primary m-1 text-white"
                    onClick={() =>
                      setAddValues({
                        visible: true,
                        password: randomInterval(100000, 999999),
                      })
                    }
                  >
                    <RiAddCircleFill size={20} className="mr-2" /> Yönetici
                    Oluştur
                  </Button>
                  <Button className="btn btn-gray m-1" onClick={getManagers}>
                    <RiRefreshLine size={20} className="mr-2" />
                    Yenile
                  </Button>
                </div>
                <DataTable
                  items={managers}
                  onDelete={(id) =>
                    showDialog("ok", {
                      message: "Yöneticiyi silmek istediginizden emin misiniz?",
                      onOk: () => deleteManager(id, () => getManagers()),
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/**Add Modal */}
        <Modal
          title="Yönetici Oluştur"
          footer={false}
          visible={addValues.visible}
          onCancel={() => setAddValues({ visible: false })}
        >
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <div className="form-group form-group-default">
                <label>İsim</label>
                <input
                  className="form-control"
                  value={addValues?.name}
                  onChange={(e) =>
                    setAddValues({
                      ...addValues,
                      name: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="form-group form-group-default">
                <label>Soyisim</label>
                <input
                  className="form-control"
                  value={addValues?.surname}
                  onChange={(e) =>
                    setAddValues({
                      ...addValues,
                      surname: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="col-lg-12 col-md-12">
              <div className="form-group form-group-default">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={addValues?.email}
                  onChange={(e) =>
                    setAddValues({
                      ...addValues,
                      email: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="col-lg-12 col-md-12">
              <div className="form-group form-group-default">
                <label>Şifre</label>
                <div className="d-flex justify-content-end align-items-center pb-1">
                  <div className="mr-3">
                    <b>{addValues?.password}</b>
                  </div>
                  <CopyToClipboard
                    text={addValues?.password}
                    onCopy={() => message.success("Kopyalandı")}
                  >
                    <Button className="btn btn-gray py-0 px-3">
                      <RiFileCopyFill size={18} />
                    </Button>
                  </CopyToClipboard>
                  <Button
                    className="btn btn-secondary text-white py-0 px-3 ml-2"
                    onClick={() =>
                      setAddValues({
                        ...addValues,
                        password: randomInterval(100000, 999999),
                      })
                    }
                  >
                    <RiRefreshLine size={18} />
                  </Button>
                </div>
              </div>
            </div>
            <div className="col-12 text-right">
              <Button
                className="btn btn-primary text-white"
                onClick={() =>
                  createManager(() => {
                    getManagers();
                    setAddValues({
                      visible: false,
                    });
                  })
                }
              >
                <RiAddCircleFill size={20} className="mr-2" />
                Oluştur
              </Button>
            </div>
          </div>
        </Modal>
      </Content>
    </div>
  );
}
