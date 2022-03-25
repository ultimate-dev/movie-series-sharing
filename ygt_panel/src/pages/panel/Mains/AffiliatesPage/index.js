import { message, Button } from "antd";
import React, { useEffect, useState } from "react";
import { RiAddCircleFill, RiRefreshLine, RiSave2Fill } from "react-icons/ri";
//Components
import { Content, ImagePicker } from "../../../../components";
import DataTable from "./DataTable";
import { get, post, put, del } from "../../../../helpers/http.helper";
import {
  hideLoading,
  showLoading,
  showDialog,
} from "../../../../redux/actions";
import Modal from "antd/lib/modal/Modal";

export default function Page({ Header }) {
  const [affiliates, setAffiliates] = useState([]);
  const [addValues, setAddValues] = useState({
    visible: false,
  });
  const [editValues, setEditValues] = useState({
    visible: false,
  });

  async function getAffiliates() {
    showLoading();
    await get("api/mains/affiliates").then((res) => {
      if (res.result) {
        setAffiliates(res.affiliates);
      } else {
        message.error(res.message);
      }
      hideLoading();
    });
  }

  async function deleteAffiliates(affiliate_id, run) {
    showLoading();
    await del("api/mains/affiliates", { affiliate_id }).then((res) => {
      if (res.result) {
        message.success(res.message);
        run();
      } else {
        message.error(res.message);
      }
      hideLoading();
    });
  }

  async function addAffiliates(run) {
    showLoading();
    let formData = new FormData();
    formData.append("logo", addValues.logo ? addValues.logo : "");
    formData.append("name", addValues.name ? addValues.name : "");
    formData.append("link", addValues.link ? addValues.link : "");

    await put("api/mains/affiliates", formData).then((res) => {
      if (res.result) {
        message.success(res.message);
        run();
      } else {
        message.error(res.message);
      }
      hideLoading();
    });
  }

  async function editAffiliates(run) {
    showLoading();
    let formData = new FormData();
    formData.append("logo", editValues.logo ? editValues.logo : "");
    formData.append("name", editValues.name ? editValues.name : "");
    formData.append("link", editValues.link ? editValues.link : "");

    formData.append(
      "affiliate_id",
      editValues.affiliate_id ? editValues.affiliate_id : ""
    );

    await post("api/mains/affiliates", formData).then((res) => {
      if (res.result) {
        message.success(res.message);
        run();
      } else {
        message.error(res.message);
      }
      hideLoading();
    });
  }

  useEffect(() => getAffiliates(), []);

  return (
    <div className="page-inner">
      <Header.Breadcrumb
        breadcrumb={[
          {
            name: "Sayfalar",
            to: "/mains",
          },
        ]}
        head="İştirakler"
        desc="Busayfada iştiraklerinizi goruntuleyebilir, duzenleyebilir, silebilir ve yeni iştirak ekleyebilirsiniz."
      />
      <Content>
        <div className="row">
          <div className="col-md-12">
            <div className="card full-height">
              <div className="card-body">
                <div className="text-right mb-3">
                  <Button
                    className="btn btn-primary text-white m-1"
                    onClick={() => setAddValues({ visible: true })}
                  >
                    <RiAddCircleFill size={20} className="mr-2" />
                    Yeni İştirak Ekle
                  </Button>
                  <Button
                    className="btn btn-gray m-1"
                    onClick={() => getAffiliates()}
                  >
                    <RiRefreshLine size={20} className="mr-2" />
                    Yenile
                  </Button>
                </div>
                <DataTable
                  items={affiliates}
                  onDelete={(id) =>
                    showDialog("ok", {
                      message: "Veriyi silmek istediğinden emin misin?",
                      onOk: () => deleteAffiliates(id, () => getAffiliates()),
                    })
                  }
                  onEdit={(item) => setEditValues({ ...item, visible: true })}
                />
              </div>
            </div>
          </div>
        </div>
        {/**Add Modal */}
        <Modal
          title="Yeni İştirak Ekle"
          visible={addValues.visible}
          onCancel={() => setAddValues({ visible: false })}
          footer={false}
        >
          <div className="w-100">
            <div className="form-group form-group-default">
              <label>Logo</label>
              <ImagePicker
                className="w-100"
                value={addValues?.logo}
                onChange={(img) =>
                  setAddValues({ ...addValues, logo: img, change: true })
                }
              />
            </div>
            <div className="form-group form-group-default">
              <label>İştirak İsmi</label>
              <input
                className="form-control"
                value={addValues?.name}
                onChange={(e) =>
                  setAddValues({
                    ...addValues,
                    name: e.target.value,
                    change: true,
                  })
                }
              />
            </div>
            <div className="form-group form-group-default">
              <label>URL</label>
              <input
                type="url"
                className="form-control"
                value={addValues?.link}
                onChange={(e) =>
                  setAddValues({
                    ...addValues,
                    link: e.target.value,
                    change: true,
                  })
                }
              />
            </div>
          </div>
          <div className="w-100 mt-3 text-right">
            <Button
              className="btn btn-primary text-white"
              onClick={() =>
                addAffiliates(() => {
                  getAffiliates();
                  setAddValues({ visible: false });
                })
              }
              disabled={!addValues.change}
            >
              <RiAddCircleFill size={20} className="mr-2" />
              Ekle
            </Button>
          </div>
        </Modal>
        {/**Edit Modal */}
        <Modal
          title="İştirak Düzenle"
          visible={editValues.visible}
          onCancel={() => setEditValues({ visible: false })}
          footer={false}
        >
          <div className="w-100">
            <div className="form-group form-group-default">
              <label>Logo</label>
              <ImagePicker
                className="w-100"
                value={editValues?.logo}
                onChange={(img) =>
                  setEditValues({ ...editValues, logo: img, change: true })
                }
              />
            </div>
            <div className="form-group form-group-default">
              <label>İştirak İsmi</label>
              <input
                className="form-control"
                value={editValues?.name}
                onChange={(e) =>
                  setEditValues({
                    ...editValues,
                    name: e.target.value,
                    change: true,
                  })
                }
              />
            </div>
            <div className="form-group form-group-default">
              <label>URL</label>
              <input
                type="url"
                className="form-control"
                value={editValues?.link}
                onChange={(e) =>
                  setEditValues({
                    ...editValues,
                    link: e.target.value,
                    change: true,
                  })
                }
              />
            </div>
          </div>
          <div className="w-100 mt-3 text-right">
            <Button
              className="btn btn-primary text-white"
              onClick={() =>
                showDialog("ok", {
                  message: "Değişiklikler kaydedilsin mi?",
                  onOk: () =>
                    editAffiliates(() => {
                      getAffiliates();
                      setEditValues({ visible: false });
                    }),
                })
              }
              disabled={!editValues.change}
            >
              <RiSave2Fill size={20} className="mr-2" />
              Kaydet
            </Button>
          </div>
        </Modal>
      </Content>
    </div>
  );
}
