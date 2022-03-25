import { message, Modal, Button } from "antd";
import React, { useEffect, useState } from "react";
import { RiAddCircleFill, RiRefreshLine, RiSave2Fill } from "react-icons/ri";
//Components
import { Content } from "../../../../../components";
import { del, get, put, post } from "../../../../../helpers/http.helper";
import {
  hideLoading,
  showLoading,
  showDialog,
} from "../../../../../redux/actions";
import DataTable from "./DataTable";

export default function Page({ Header }) {
  let [countries, setCountries] = useState([]);
  let [addCountriesValues, setAddCountriesValues] = useState({
    visible: false,
  });
  let [addOfficesValues, setAddOfficesValues] = useState({
    visible: false,
  });
  let [editCountriesValues, setEditCountriesValues] = useState({
    visible: false,
  });
  let [editOfficesValues, setEditOfficesValues] = useState({
    visible: false,
  });

  async function getOffices() {
    showLoading();
    await get("api/mains/offices").then((res) => {
      if (res.result) {
        console.log(res);
        setCountries(res.countries);
      } else {
        message.error(res.message);
      }
      hideLoading();
    });
  }

  async function addCountries(run) {
    showLoading();
    await put("api/mains/offices/countries", { ...addCountriesValues }).then(
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
  async function editCountries(run) {
    showLoading();
    await post("api/mains/offices/countries", { ...editCountriesValues }).then(
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
  async function deleteCountries(office_country_id, run) {
    showLoading();
    await del("api/mains/offices/countries", { office_country_id }).then(
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

  async function addOffices(run) {
    showLoading();
    await put("api/mains/offices", { ...addOfficesValues }).then((res) => {
      if (res.result) {
        message.success(res.message);
        run();
      } else {
        message.error(res.message);
      }
      hideLoading();
    });
  }

  async function deleteOffices(office_id, run) {
    showLoading();
    await del("api/mains/offices", { office_id }).then((res) => {
      if (res.result) {
        message.success(res.message);
        run();
      } else {
        message.error(res.message);
      }
      hideLoading();
    });
  }
  async function editOffices(run) {
    showLoading();
    await post("api/mains/offices", { ...editOfficesValues }).then(
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

  useEffect(() => {
    getOffices();
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
        head="Ofislerimiz"
        desc="Ofizlerinizi goruntuleyebilirsiniz. Ayrica ofis bilgileriniz bize ulasin blumundede gozukmektedir."
      />
      <Content>
        <div className="row">
          <div className="col-md-12">
            <div className="card full-height">
              <div className="card-body">
                <div className="text-right mb-3">
                  <Button
                    className="btn btn-primary text-white m-1"
                    onClick={() => setAddCountriesValues({ visible: true })}
                  >
                    <RiAddCircleFill size={20} className="mr-2" />
                    Yeni Ulke Ekle
                  </Button>
                  <Button className="btn btn-gray m-1">
                    <RiRefreshLine
                      size={20}
                      className="mr-2"
                      onClick={() => getOffices()}
                    />
                    Yenile
                  </Button>
                </div>
                <div className="w-100">
                  <DataTable
                    items={countries}
                    onAddOffice={(id) =>
                      setAddOfficesValues({
                        visible: true,
                        office_country_id: id,
                      })
                    }
                    onEdit={(item) =>
                      setEditCountriesValues({
                        visible: true,
                        ...item,
                      })
                    }
                    onEditOffice={(item) =>
                      setEditOfficesValues({
                        visible: true,
                        ...item,
                      })
                    }
                    onDelete={(id) =>
                      showDialog("ok", {
                        message: "Veriyi silmek istediğinden emin misin?",
                        onOk: () => deleteCountries(id, () => getOffices()),
                      })
                    }
                    onDeleteOffice={(id) =>
                      showDialog("ok", {
                        message: "Veriyi silmek istediğinden emin misin?",
                        onOk: () => deleteOffices(id, () => getOffices()),
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/**
         * Office Add Modal
         */}
        <Modal
          title="Yeni Ofis Ekle"
          visible={addOfficesValues.visible}
          onCancel={() => setAddOfficesValues({ visible: false })}
          footer={false}
        >
          <div className="w-100">
            <div className="form-group form-group-default">
              <label>Sehir</label>
              <input
                className="form-control"
                value={addOfficesValues.city}
                onChange={(e) =>
                  setAddOfficesValues({
                    ...addOfficesValues,
                    city: e.target.value,
                    change: true,
                  })
                }
              />
            </div>
            <div className="form-group form-group-default">
              <label>Adres</label>
              <textarea
                className="form-control"
                onChange={(e) =>
                  setAddOfficesValues({
                    ...addOfficesValues,
                    adress: e.target.value,
                    change: true,
                  })
                }
              >
                {addOfficesValues.adress}
              </textarea>
            </div>
            <div className="form-group form-group-default">
              <label>Telefon 1</label>
              <input
                className="form-control"
                value={addOfficesValues.tel_1}
                onChange={(e) =>
                  setAddOfficesValues({
                    ...addOfficesValues,
                    tel_1: e.target.value,
                    change: true,
                  })
                }
              />
            </div>
            <div className="form-group form-group-default">
              <label>Telefon 2 (Opsiyonel)</label>
              <input
                className="form-control"
                value={addOfficesValues.tel_2}
                onChange={(e) =>
                  setAddOfficesValues({
                    ...addOfficesValues,
                    tel_2: e.target.value,
                    change: true,
                  })
                }
              />
            </div>
            <div className="form-group form-group-default">
              <label>E-Posta 1</label>
              <input
                className="form-control"
                value={addOfficesValues.email_1}
                onChange={(e) =>
                  setAddOfficesValues({
                    ...addOfficesValues,
                    email_1: e.target.value,
                    change: true,
                  })
                }
              />
            </div>
            <div className="form-group form-group-default">
              <label>E-Posta 2 (Opsiyonel)</label>
              <input
                className="form-control"
                value={addOfficesValues.email_2}
                onChange={(e) =>
                  setAddOfficesValues({
                    ...addOfficesValues,
                    email_2: e.target.value,
                    change: true,
                  })
                }
              />
            </div>
            <div className="row">
              <div className="col-12 mb-2 mt-3 text-center">
                <a href="https://www.google.com.tr/maps" target="blank">
                  Google Map
                </a>
              </div>
              <div className="col-md-6">
                <div className="form-group form-group-default">
                  <label>Enlem</label>
                  <input
                    className="form-control"
                    value={addOfficesValues.latitude}
                    onChange={(e) =>
                      setAddOfficesValues({
                        ...addOfficesValues,
                        latitude: e.target.value,
                        change: true,
                      })
                    }
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group form-group-default">
                  <label>Boylam</label>
                  <input
                    className="form-control"
                    value={addOfficesValues.longitude}
                    onChange={(e) =>
                      setAddOfficesValues({
                        ...addOfficesValues,
                        longitude: e.target.value,
                        change: true,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-100 mt-3 text-right">
            <Button
             disabled={!addOfficesValues.change}
              className="btn btn-primary text-white"
              onClick={() =>
                addOffices(() => {
                  setAddOfficesValues({ visible: false });
                  getOffices();
                })
              }
            >
              <RiAddCircleFill size={20} className="mr-2" />
              Ekle
            </Button>
          </div>
        </Modal>
        {/**
         * Country Add Modal
         */}
        <Modal
          title="Yeni Ulke Ekle"
          visible={addCountriesValues.visible}
          onCancel={() => setAddCountriesValues({ visible: false })}
          footer={false}
        >
          <div className="w-100">
            <div className="form-group form-group-default">
              <label>Ulke Ismi</label>
              <input
                className="form-control"
                value={addCountriesValues.name}
                onChange={(e) =>
                  setAddCountriesValues({
                    ...addCountriesValues,
                    name: e.target.value,
                    change: true,
                  })
                }
              />
            </div>
          </div>
          <div className="w-100 mt-3 text-right">
            <Button
             disabled={!addCountriesValues.change}
              className="btn btn-primary text-white"
              onClick={() =>
                addCountries(() => {
                  setAddCountriesValues({ visible: false });
                  getOffices();
                })
              }
            >
              <RiAddCircleFill size={20} className="mr-2" />
              Ekle
            </Button>
          </div>
        </Modal>

        {/**
         * Office Edit Modal
         */}
        <Modal
          title="Yeni Ofis Ekle"
          visible={editOfficesValues.visible}
          onCancel={() => setEditOfficesValues({ visible: false })}
          footer={false}
        >
          <div className="w-100">
            <div className="form-group form-group-default">
              <label>Sehir</label>
              <input
                className="form-control"
                value={editOfficesValues.city}
                onChange={(e) =>
                  setEditOfficesValues({
                    ...editOfficesValues,
                    city: e.target.value,
                    change: true,
                  })
                }
              />
            </div>
            <div className="form-group form-group-default">
              <label>Adres</label>
              <textarea
                className="form-control"
                onChange={(e) =>
                  setEditOfficesValues({
                    ...editOfficesValues,
                    adress: e.target.value,
                    change: true,
                  })
                }
              >
                {editOfficesValues.adress}
              </textarea>
            </div>
            <div className="form-group form-group-default">
              <label>Telefon 1</label>
              <input
                className="form-control"
                value={editOfficesValues.tel_1}
                onChange={(e) =>
                  setEditOfficesValues({
                    ...editOfficesValues,
                    tel_1: e.target.value,
                    change: true,
                  })
                }
              />
            </div>
            <div className="form-group form-group-default">
              <label>Telefon 2 (Opsiyonel)</label>
              <input
                className="form-control"
                value={editOfficesValues.tel_2}
                onChange={(e) =>
                  setEditOfficesValues({
                    ...editOfficesValues,
                    tel_2: e.target.value,
                    change: true,
                  })
                }
              />
            </div>
            <div className="form-group form-group-default">
              <label>E-Posta 1</label>
              <input
                className="form-control"
                value={editOfficesValues.email_1}
                onChange={(e) =>
                  setEditOfficesValues({
                    ...editOfficesValues,
                    email_1: e.target.value,
                    change: true,
                  })
                }
              />
            </div>
            <div className="form-group form-group-default">
              <label>E-Posta 2 (Opsiyonel)</label>
              <input
                className="form-control"
                value={editOfficesValues.email_2}
                onChange={(e) =>
                  setEditOfficesValues({
                    ...editOfficesValues,
                    email_2: e.target.value,
                    change: true,
                  })
                }
              />
            </div>
            <div className="row">
              <div className="col-12 mb-2 mt-3 text-center">
                <a href="https://www.google.com.tr/maps" target="blank">
                  Google Map
                </a>
              </div>
              <div className="col-md-6">
                <div className="form-group form-group-default">
                  <label>Enlem</label>
                  <input
                    className="form-control"
                    value={editOfficesValues.latitude}
                    onChange={(e) =>
                      setEditOfficesValues({
                        ...editOfficesValues,
                        latitude: e.target.value,
                        change: true,
                      })
                    }
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group form-group-default">
                  <label>Boylam</label>
                  <input
                    className="form-control"
                    value={editOfficesValues.longitude}
                    onChange={(e) =>
                      setEditOfficesValues({
                        ...editOfficesValues,
                        longitude: e.target.value,
                        change: true,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-100 mt-3 text-right">
            <Button
             disabled={!editOfficesValues.change}
              className="btn btn-primary text-white"
              onClick={() =>
                showDialog("ok", {
                  message:
                    "Değişiklikler kaydedilsin mi?",
                  onOk: () =>
                    editOffices(() => {
                      setEditOfficesValues({ visible: false });
                      getOffices();
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
         * Country Edit Modal
         */}
        <Modal
          title="Ulke Duzenle"
          visible={editCountriesValues.visible}
          onCancel={() => setEditCountriesValues({ visible: false })}
          footer={false}
        >
          <div className="w-100">
            <div className="form-group form-group-default">
              <label>Ulke Ismi</label>
              <input
                className="form-control"
                value={editCountriesValues.name}
                onChange={(e) =>
                  setEditCountriesValues({
                    ...editCountriesValues,
                    name: e.target.value,
                    change: true,
                  })
                }
              />
            </div>
          </div>
          <div className="w-100 mt-3 text-right">
            <Button
              disabled={!editCountriesValues.change}
              className="btn btn-primary text-white"
              onClick={() =>
                showDialog("ok", {
                  message:
                    "Değişiklikler kaydedilsin mi?",
                  onOk: () =>
                    editCountries(() => {
                      setEditCountriesValues({ visible: false });
                      getOffices();
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
