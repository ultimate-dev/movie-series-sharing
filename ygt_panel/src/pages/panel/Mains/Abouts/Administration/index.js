import { message, Modal, Button } from "antd";
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

export default function Page({ Header }) {
  let [roles, setRoles] = useState([]);
  let [addRolesValues, setAddRolesValues] = useState({ visible: false });
  let [addDirectorsValues, setAddDirectorsValues] = useState({
    visible: false,
  });
  let [editRolesValues, setEditRolesValues] = useState({ visible: false });
  let [editDirectorsValues, setEditDirectorsValues] = useState({
    visible: false,
  });

  async function getDirectors() {
    showLoading();
    await get("api/mains/directors").then((res) => {
      if (res.result) {
        setRoles(res.roles);
      } else {
        message.error(res.message);
      }
      hideLoading();
    });
  }
  async function addRoles(run) {
    showLoading();
    await put("api/mains/directors/roles", { ...addRolesValues }).then(
      (res) => {
        if (res.result) {
          message.success(res.message);
          run();
        } else {
          message.error(res.message);
        }
        hideLoading();
      }
    );
  }
  async function addDirectors(run) {
    showLoading();
    let formData = new FormData();
    formData.append(
      "image",
      addDirectorsValues.image ? addDirectorsValues.image : ""
    );
    formData.append(
      "name",
      addDirectorsValues.name ? addDirectorsValues.name : ""
    );
    formData.append(
      "director_role_id",
      addDirectorsValues.director_role_id
        ? addDirectorsValues.director_role_id
        : ""
    );

    await put("api/mains/directors", formData).then((res) => {
      if (res.result) {
        message.success(res.message);
        run();
      } else {
        message.error(res.message);
      }
      hideLoading();
    });
  }
  async function deleteRoles(director_role_id, run) {
    showLoading();
    await del("api/mains/directors/roles", { director_role_id }).then((res) => {
      if (res.result) {
        message.success(res.message);
        run();
      } else {
        message.error(res.message);
      }
      hideLoading();
    });
  }
  async function deleteDirectors(director_id, run) {
    showLoading();
    await del("api/mains/directors", { director_id }).then((res) => {
      if (res.result) {
        message.success(res.message);
        run();
      } else {
        message.error(res.message);
      }
      hideLoading();
    });
  }
  async function editRoles(run) {
    showLoading();
    await post("api/mains/directors/roles", { ...editRolesValues }).then(
      (res) => {
        if (res.result) {
          message.success(res.message);
          run();
        } else {
          message.error(res.message);
        }
        hideLoading();
      }
    );
  }
  async function editDirectors(run) {
    showLoading();
    let formData = new FormData();
    formData.append(
      "image",
      editDirectorsValues.image ? editDirectorsValues.image : ""
    );
    formData.append(
      "name",
      editDirectorsValues.name ? editDirectorsValues.name : ""
    );
    formData.append(
      "director_id",
      editDirectorsValues.director_id ? editDirectorsValues.director_id : ""
    );

    await post("api/mains/directors", formData).then((res) => {
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
    getDirectors();
  }, []);

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
        head="Yonetim"
        desc="Bu sayfada rol ekleyerek role yonetici ekleyebilirsiniz. Rolun seviyesi duduk olan en ustte gozukur."
      />
      <Content>
        <div className="row">
          <div className="col-md-12">
            <div className="card full-height">
              <div className="card-body">
                <div className="text-right mb-3">
                  <Button
                    className="btn btn-primary text-white m-1"
                    onClick={() => setAddRolesValues({ visible: true })}
                  >
                    <RiAddCircleFill size={20} className="mr-2" />
                    Yeni Rol Ekle
                  </Button>
                  <Button className="btn btn-gray m-1">
                    <RiRefreshLine
                      size={20}
                      className="mr-2"
                      onClick={() => getDirectors()}
                    />
                    Yenile
                  </Button>
                </div>
                <div className="w-100">
                  <DataTable
                    items={roles}
                    onAddDirector={(director_role_id) =>
                      setAddDirectorsValues({ visible: true, director_role_id })
                    }
                    onEdit={(item) =>
                      setEditRolesValues({
                        visible: true,
                        ...item,
                      })
                    }
                    onEditDirector={(item) =>
                      setEditDirectorsValues({
                        visible: true,
                        ...item,
                      })
                    }
                    onDelete={(id) =>
                      showDialog("ok", {
                        message: "Veriyi silmek istediğinden emin misin?",
                        onOk: () => deleteRoles(id, () => getDirectors()),
                      })
                    }
                    onDeleteDirector={(id) =>
                      showDialog("ok", {
                        message: "Veriyi silmek istediğinden emin misin?",
                        onOk: () => deleteDirectors(id, () => getDirectors()),
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/**
         * Directors Add Modal
         */}
        <Modal
          title="Yeni Yonetici Ekle"
          visible={addDirectorsValues.visible}
          onCancel={() => setAddDirectorsValues({ visible: false })}
          footer={false}
        >
          <div className="w-100">
            <div className="form-group form-group-default">
              <label>Yonetici Fotografi</label>
              <ImagePicker
                className="mt-2 w-100"
                value={addDirectorsValues.image}
                onChange={(img) =>
                  setAddDirectorsValues({
                    ...addDirectorsValues,
                    image: img,
                    change: true,
                  })
                }
              />
            </div>
            <div className="form-group form-group-default">
              <label>Yonetici Ismi</label>
              <input
                className="form-control"
                value={addDirectorsValues.name}
                onChange={(e) =>
                  setAddDirectorsValues({
                    ...addDirectorsValues,
                    name: e.target.value,
                    change: true,
                  })
                }
              />
            </div>
          </div>
          <div className="w-100 mt-3 text-right">
            <Button
              disabled={!addDirectorsValues.change}
              className="btn btn-primary text-white"
              onClick={() =>
                addDirectors(() => {
                  setAddDirectorsValues({ visible: false });
                  getDirectors();
                })
              }
            >
              <RiAddCircleFill size={20} className="mr-2" />
              Ekle
            </Button>
          </div>
        </Modal>
        {/**
         * Roles Add Modal
         */}
        <Modal
          title="Yeni Rol Ekle"
          visible={addRolesValues.visible}
          onCancel={() => setAddRolesValues({ visible: false })}
          footer={false}
        >
          <div className="w-100">
            <div className="form-group form-group-default">
              <label>Rol</label>
              <input
                className="form-control"
                value={addRolesValues.name}
                onChange={(e) =>
                  setAddRolesValues({
                    ...addRolesValues,
                    name: e.target.value,
                    change: true,
                  })
                }
              />
            </div>
            <div className="form-group form-group-default">
              <label>Rol Seviyesi</label>
              <input
                type="number"
                className="form-control"
                value={addRolesValues.level}
                onChange={(e) =>
                  setAddRolesValues({
                    ...addRolesValues,
                    level: e.target.value,
                    change: true,
                  })
                }
              />
            </div>
          </div>
          <div className="w-100 mt-3 text-right">
            <Button
              disabled={!addRolesValues.change}
              className="btn btn-primary text-white"
              onClick={() =>
                addRoles(() => {
                  setAddRolesValues({ visible: false });
                  getDirectors();
                })
              }
            >
              <RiAddCircleFill size={20} className="mr-2" />
              Ekle
            </Button>
          </div>
        </Modal>

        {/**
         * Directors Edit Modal
         */}
        <Modal
          title="Yonetici Duzenle"
          visible={editDirectorsValues.visible}
          onCancel={() => setEditDirectorsValues({ visible: false })}
          footer={false}
        >
          <div className="w-100">
            <div className="form-group form-group-default">
              <label>Yonetici Fotografi</label>
              <ImagePicker
                className="mt-2 w-100"
                value={editDirectorsValues.image}
                onChange={(img) =>
                  setEditDirectorsValues({
                    ...editDirectorsValues,
                    image: img,
                    change: true,
                  })
                }
              />
            </div>
            <div className="form-group form-group-default">
              <label>Yonetici Ismi</label>
              <input
                className="form-control"
                value={editDirectorsValues.name}
                onChange={(e) =>
                  setEditDirectorsValues({
                    ...editDirectorsValues,
                    name: e.target.value,
                    change: true,
                  })
                }
              />
            </div>
          </div>
          <div className="w-100 mt-3 text-right">
            <Button
              disabled={!editDirectorsValues.change}
              className="btn btn-primary text-white"
              onClick={() =>
                showDialog("ok", {
                  message: "Değişiklikler kaydedilsin mi?",
                  onOk: () =>
                    editDirectors(() => {
                      setEditDirectorsValues({ visible: false });
                      getDirectors();
                    }),
                })
              }
            >
              <RiSave2Fill size={20} className="mr-2" />
              Kaydet
            </Button>
          </div>
        </Modal>

        {/**
         * Roles Edit Modal
         */}
        <Modal
          title="Rol Duzenle"
          visible={editRolesValues.visible}
          onCancel={() => setEditRolesValues({ visible: false })}
          footer={false}
        >
          <div className="w-100">
            <div className="form-group form-group-default">
              <label>Rol</label>
              <input
                className="form-control"
                value={editRolesValues.name}
                onChange={(e) =>
                  setEditRolesValues({
                    ...editRolesValues,
                    name: e.target.value,
                    change: true,
                  })
                }
              />
            </div>
            <div className="form-group form-group-default">
              <label>Rol Seviyesi</label>
              <input
                type="number"
                className="form-control"
                value={editRolesValues.level}
                onChange={(e) =>
                  setEditRolesValues({
                    ...editRolesValues,
                    level: e.target.value,
                    change: true,
                  })
                }
              />
            </div>
          </div>
          <div className="w-100 mt-3 text-right">
            <Button
              disabled={!editRolesValues.change}
              className="btn btn-primary text-white"
              onClick={() =>
                showDialog("ok", {
                  message:
                    "Değişiklikler kaydedilsin mi?",
                  onOk: () =>
                    editRoles(() => {
                      setEditRolesValues({ visible: false });
                      getDirectors();
                    }),
                })
              }
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
