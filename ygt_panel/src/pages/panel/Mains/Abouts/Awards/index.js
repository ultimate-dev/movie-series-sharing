import { message, Modal, Button, DatePicker, Switch } from "antd";
import React, { useEffect, useState } from "react";
import { RiAddCircleFill, RiRefreshLine, RiSave2Fill } from "react-icons/ri";
//Components
import { Content, ImagePicker } from "../../../../../components";
import { del, get, put, post } from "../../../../../helpers/http.helper";
import {
  hideLoading,
  showLoading,
  showDialog,
} from "../../../../../redux/actions";
import DataTable from "./DataTable";
import moment from "moment";

export default function Page({ Header }) {
  const [awards, setAwards] = useState([]);
  const [addValues, setAddValues] = useState({
    visible: false,
  });
  const [editValues, setEditValues] = useState({
    visible: false,
  });

  async function getAwards() {
    showLoading();
    await get("api/mains/awards").then((res) => {
      if (res.result) {
        setAwards(res.awards);
      } else {
        message.error(res.message);
      }
      hideLoading();
    });
  }

  async function deleteAwards(award_id, run) {
    showLoading();
    await del("api/mains/awards", { award_id }).then((res) => {
      if (res.result) {
        message.success(res.message);
        run();
      } else {
        message.error(res.message);
      }
      hideLoading();
    });
  }

  async function addAwards(run) {
    showLoading();
    let formData = new FormData();
    formData.append("head", addValues.head ? addValues.head : "");
    formData.append("desc", addValues.desc ? addValues.desc : "");
    formData.append("image", addValues.image ? addValues.image : "");
    formData.append("date", addValues.date ? addValues.date : "");
    formData.append("success", addValues.success);

    await put("api/mains/awards", formData).then((res) => {
      if (res.result) {
        message.success(res.message);
        run();
      } else {
        message.error(res.message);
      }
      hideLoading();
    });
  }

  async function editAwards(run) {
    showLoading();
    let formData = new FormData();
    formData.append("head", editValues.head ? editValues.head : "");
    formData.append("desc", editValues.desc ? editValues.desc : "");
    formData.append("image", editValues.image ? editValues.image : "");
    formData.append("award_id", editValues.award_id ? editValues.award_id : "");
    formData.append("date", editValues.date ? editValues.date : "");
    formData.append("success", editValues.success);

    await post("api/mains/awards", formData).then((res) => {
      if (res.result) {
        message.success(res.message);
        run();
      } else {
        message.error(res.message);
      }
      hideLoading();
    });
  }

  useEffect(() => getAwards(), []);

  return (
    <div className="page-inner">
      <Header.Breadcrumb
        breadcrumb={[
          {
            name: "Sayfalar",
            to: "/mains",
          },
          {
            name: "Hakkimizda",
            to: "/mains/about",
          },
        ]}
        head="Ödüller & Başarılar"
        desc="Bu sayfada odullerinizi ve basariliarinizi ekleyebilir, duzenleyebilir ve silebilirsiniz."
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
                    Yeni Faaliyet Alanı Ekle
                  </Button>
                  <Button
                    className="btn btn-gray m-1"
                    onClick={() => getAwards()}
                  >
                    <RiRefreshLine size={20} className="mr-2" />
                    Yenile
                  </Button>
                </div>
                <DataTable
                  items={awards}
                  onDelete={(id) =>
                    showDialog("ok", {
                      message: "Veriyi silmek istediğinden emin misin?",
                      onOk: () => deleteAwards(id, () => getAwards()),
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
          title="Yeni Faaliyet Alanı Ekle"
          visible={addValues.visible}
          onCancel={() => setAddValues({ visible: false })}
          footer={false}
        >
          <div className="w-100">
            <div className="form-group form-group-default pb-2">
              <label>Ödül / Başarı</label>
              <div className="w-100 text-center">
                <Switch
                  className="mb-2"
                  checkedChildren="Başarı"
                  unCheckedChildren="Ödül"
                  checked={addValues?.success == 1}
                  onChange={(checked) => {
                    setAddValues({
                      ...addValues,
                      success: checked ? 1 : 0,
                      change: true,
                    });
                  }}
                />
              </div>
            </div>
            <div className="form-group form-group-default">
              <label>Fotoğraf</label>
              <ImagePicker
                className="w-100"
                value={addValues?.image}
                onChange={(img) =>
                  setAddValues({ ...addValues, image: img, change: true })
                }
              />
            </div>
            <div className="form-group form-group-default">
              <label>Başlık</label>
              <input
                className="form-control"
                value={addValues?.head}
                onChange={(e) =>
                  setAddValues({
                    ...addValues,
                    head: e.target.value,
                    change: true,
                  })
                }
              />
            </div>
            <div className="form-group form-group-default">
              <label>Aciklama</label>
              <textarea
                className="form-control"
                rows={5}
                onChange={(e) =>
                  setAddValues({
                    ...addValues,
                    desc: e.target.value,
                    change: true,
                  })
                }
              >
                {addValues?.desc}
              </textarea>
            </div>
            <div className="form-group form-group-default">
              <label>Tarih</label>
              <DatePicker
                className="w-100"
                bordered={false}
                value={moment(addValues?.date)}
                format="DD.MM.YYYY"
                onChange={(date) =>
                  setAddValues({
                    ...addValues,
                    date,
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
                addAwards(() => {
                  getAwards();
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
          title="Faaliyet Alanı Düzenle"
          visible={editValues.visible}
          onCancel={() => setEditValues({ visible: false })}
          footer={false}
        >
          <div className="w-100">
            <div className="form-group form-group-default pb-2">
              <label>Ödül / Başarı</label>
              <div className="w-100 text-center">
                <Switch
                  className="mb-2"
                  checkedChildren="Başarı"
                  unCheckedChildren="Ödül"
                  checked={editValues?.success == 1}
                  onChange={(checked) => {
                    setEditValues({
                      ...editValues,
                      success: checked ? 1 : 0,
                      change: true,
                    });
                  }}
                />
              </div>
            </div>
            <div className="form-group form-group-default">
              <label>Fotoğraf</label>
              <ImagePicker
                className="w-100"
                value={editValues?.image}
                onChange={(img) =>
                  setEditValues({ ...editValues, image: img, change: true })
                }
              />
            </div>
            <div className="form-group form-group-default">
              <label>Başlık</label>
              <input
                className="form-control"
                value={editValues?.head}
                onChange={(e) =>
                  setEditValues({
                    ...editValues,
                    head: e.target.value,
                    change: true,
                  })
                }
              />
            </div>
            <div className="form-group form-group-default">
              <label>Aciklama</label>
              <textarea
                className="form-control"
                rows={5}
                onChange={(e) =>
                  setEditValues({
                    ...editValues,
                    desc: e.target.value,
                    change: true,
                  })
                }
              >
                {editValues?.desc}
              </textarea>
            </div>
            <div className="form-group form-group-default">
              <label>Tarih</label>
              <DatePicker
                className="w-100"
                bordered={false}
                value={moment(editValues?.date)}
                format="DD.MM.YYYY"
                onChange={(date) =>
                  setEditValues({
                    ...editValues,
                    date,
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
                    editAwards(() => {
                      getAwards();
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
