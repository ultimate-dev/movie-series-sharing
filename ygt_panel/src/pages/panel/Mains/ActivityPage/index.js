import { message, Button, Modal } from "antd";
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

export default function Page({ Header }) {
  const [activity, setActivity] = useState([]);
  const [addValues, setAddValues] = useState({
    visible: false,
  });
  const [editValues, setEditValues] = useState({
    visible: false,
  });

  async function getActivity() {
    showLoading();
    await get("api/mains/activity").then((res) => {
      if (res.result) {
        setActivity(res.activity);
      } else {
        message.error(res.message);
      }
      hideLoading();
    });
  }

  async function deleteActivity(activity_id, run) {
    showLoading();
    await del("api/mains/activity", { activity_id }).then((res) => {
      if (res.result) {
        message.success(res.message);
        run();
      } else {
        message.error(res.message);
      }
      hideLoading();
    });
  }

  async function addActivity(run) {
    showLoading();
    let formData = new FormData();
    formData.append("head", addValues.head ? addValues.head : "");
    formData.append("desc", addValues.desc ? addValues.desc : "");
    formData.append("image", addValues.image ? addValues.image : "");

    await put("api/mains/activity", formData).then((res) => {
      if (res.result) {
        message.success(res.message);
        run();
      } else {
        message.error(res.message);
      }
      hideLoading();
    });
  }

  async function editActivity(run) {
    showLoading();
    let formData = new FormData();
    formData.append("head", editValues.head ? editValues.head : "");
    formData.append("desc", editValues.desc ? editValues.desc : "");
    formData.append("image", editValues.image ? editValues.image : "");
    formData.append(
      "activity_id",
      editValues.activity_id ? editValues.activity_id : ""
    );

    await post("api/mains/activity", formData).then((res) => {
      if (res.result) {
        message.success(res.message);
        run();
      } else {
        message.error(res.message);
      }
      hideLoading();
    });
  }

  useEffect(() => getActivity(), []);

  return (
    <div className="page-inner">
      <Header.Breadcrumb
        breadcrumb={[
          {
            name: "Sayfalar",
            to: "/mains",
          },
        ]}
        head="Faaliyet Alanlar??"
        desc="Busayfada faaliyet alanlarinizi goruntuleyebilir, duzenleyebilir, silebilir ve yeni i??tirak ekleyebilirsiniz."
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
                    Yeni Faaliyet Alan?? Ekle
                  </Button>
                  <Button
                    className="btn btn-gray m-1"
                    onClick={() => getActivity()}
                  >
                    <RiRefreshLine size={20} className="mr-2" />
                    Yenile
                  </Button>
                </div>
                <DataTable
                  items={activity}
                  onDelete={(id) =>
                    showDialog("ok", {
                      message: "Veriyi silmek istedi??inden emin misin?",
                      onOk: () => deleteActivity(id, () => getActivity()),
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
          title="Yeni Faaliyet Alan?? Ekle"
          visible={addValues.visible}
          onCancel={() => setAddValues({ visible: false })}
          footer={false}
        >
          <div className="w-100">
            <div className="form-group form-group-default">
              <label>Foto??raf</label>
              <ImagePicker
                className="w-100"
                value={addValues?.image}
                onChange={(img) =>
                  setAddValues({ ...addValues, image: img, change: true })
                }
              />
            </div>
            <div className="form-group form-group-default">
              <label>Ba??l??k</label>
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
          </div>
          <div className="w-100 mt-3 text-right">
            <Button
              className="btn btn-primary text-white"
              onClick={() =>
                addActivity(() => {
                  getActivity();
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
        {/**Add Modal */}
        <Modal
          title="Faaliyet Alan?? D??zenle"
          visible={editValues.visible}
          onCancel={() => setEditValues({ visible: false })}
          footer={false}
        >
          <div className="w-100">
            <div className="form-group form-group-default">
              <label>Foto??raf</label>
              <ImagePicker
                className="w-100"
                value={editValues?.image}
                onChange={(img) =>
                  setEditValues({ ...editValues, image: img, change: true })
                }
              />
            </div>
            <div className="form-group form-group-default">
              <label>Ba??l??k</label>
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
          </div>
          <div className="w-100 mt-3 text-right">
            <Button
              className="btn btn-primary text-white"
              onClick={() =>
                showDialog("ok", {
                  message: "De??i??iklikler kaydedilsin mi?",
                  onOk: () =>
                    editActivity(() => {
                      getActivity();
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
