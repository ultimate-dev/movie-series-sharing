import { message, Modal, Button } from "antd";
import React, { useEffect, useState } from "react";
import {
  RiAddCircleFill,
  RiRefreshLine,
  RiDeleteBin2Fill,
  RiEdit2Fill,
  RiCloseCircleFill,
  RiCheckLine,
} from "react-icons/ri";
//Components
import { Content } from "../../../../../components";
import { del, get, put, post } from "../../../../../helpers/http.helper";
import {
  hideLoading,
  showLoading,
  showDialog,
} from "../../../../../redux/actions";

export default function Page({ Header }) {
  let [missions, setMissions] = useState([]);
  let [visions, setVisions] = useState([]);
  let [values, setValues] = useState([]);

  let [addValues, setAddValues] = useState({ visible: false });
  //GET
  async function getMissionsVisionsValues() {
    showLoading();
    await get("api/mains/missions_visions_values").then((res) => {
      if (res.result) {
        setMissions(
          [...res.missions].map((item, key) => ({ ...item, key: "mis" + key }))
        );
        setVisions(
          [...res.visions].map((item, key) => ({ ...item, key: "vis" + key }))
        );
        setValues(
          [...res.values].map((item, key) => ({ ...item, key: "val" + key }))
        );
      } else {
        message.error(res.message);
      }
      hideLoading();
    });
  }
  //POST
  async function editMissionsVisionsValues(item, run) {
    showLoading();
    await post("api/mains/missions_visions_values", { ...item }).then((res) => {
      if (res.result) {
        message.success(res.message);
        run();
      } else {
        message.error(res.message);
      }
      hideLoading();
    });
  }
  //DEL
  async function deleteMissionsVisionsValues(missions_visions_values_id, run) {
    showLoading();
    await del("api/mains/missions_visions_values", {
      missions_visions_values_id,
    }).then((res) => {
      if (res.result) {
        message.success(res.message);
        run();
      } else {
        message.error(res.message);
      }
      hideLoading();
    });
  }
  //PUT
  async function addMissionsVisionsValues(run) {
    showLoading();
    await put("api/mains/missions_visions_values", { ...addValues }).then(
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
  useEffect(() => getMissionsVisionsValues(), []);

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
        head="Misyon, Vizyon & Değerler"
        desc="Bu sayfada ayri ayri misyon, vizyon ve degerleri goruntuleyebilirsiniz. yeni misyon, visyon ve deger ekleyebilir; duzenleyebilir ve silebilirsiniz."
      />
      <Content>
        <div className="row">
          <div className="col-md-12">
            <div className="card full-height">
              <div className="card-body">
                <div className="w-100 text-right mb-3">
                  <Button className="btn btn-gray m-1">
                    <RiRefreshLine
                      size={20}
                      className="mr-2"
                      onClick={getMissionsVisionsValues}
                    />
                    Yenile
                  </Button>
                </div>

                <div className="w-100">
                  <div className="form-group form-group-default mt-3 pb-2 w-100">
                    <label>Misyonlar</label>
                    <div className="w-100">
                      {missions
                        ? missions.map((item, key) => {
                            return (
                              <div
                                className="w-100 d-flex align-items-center mt-3"
                                key={key}
                              >
                                {!item.editable ? (
                                  <>
                                    <Button
                                      className="btn btn-danger ml-2 p-2 text-white"
                                      onClick={() =>
                                        showDialog("ok", {
                                          message:
                                            "Veriyi silmek istediğinden emin misin?",
                                          onOk: () =>
                                            deleteMissionsVisionsValues(
                                              item.missions_visions_values_id,
                                              () => getMissionsVisionsValues()
                                            ),
                                        })
                                      }
                                    >
                                      <RiDeleteBin2Fill size={20} />
                                    </Button>
                                    <Button
                                      className="btn btn-primary ml-2 p-2 text-white"
                                      onClick={() => {
                                        missions[key].editable = true;
                                        setMissions([...missions]);
                                      }}
                                    >
                                      <RiEdit2Fill size={20} />
                                    </Button>
                                  </>
                                ) : (
                                  <>
                                    <Button
                                      className="btn btn-success ml-2 p-2 text-white"
                                      disabled={!missions[key].change}
                                      onClick={() =>
                                        showDialog("ok", {
                                          message:
                                            "Değişiklikler kaydedilsin mi?",
                                          onOk: () =>
                                            editMissionsVisionsValues(
                                              item,
                                              () => getMissionsVisionsValues()
                                            ),
                                        })
                                      }
                                    >
                                      <RiCheckLine size={20} />
                                    </Button>
                                    <Button className="btn btn-danger ml-2 p-2 text-white">
                                      <RiCloseCircleFill
                                        size={20}
                                        onClick={() => {
                                          missions[key].editable = false;
                                          setMissions([...missions]);
                                          getMissionsVisionsValues();
                                        }}
                                      />
                                    </Button>
                                  </>
                                )}
                                <textarea
                                  rows={3}
                                  readOnly={!missions[key].editable}
                                  className="form-control border flex-1 ml-4 py-2 px-3 mt-0"
                                  onChange={(e) => {
                                    missions[key].desc = e.target.value;
                                    missions[key].change = true;
                                    setMissions([...missions]);
                                  }}
                                >
                                  {missions[key].desc}
                                </textarea>
                              </div>
                            );
                          })
                        : null}
                    </div>
                    <div className="w-100 text-right mt-3">
                      <Button
                        className="btn btn-primary m-1 text-white"
                        onClick={() =>
                          setAddValues({ visible: true, type: "mission" })
                        }
                      >
                        <RiAddCircleFill size={20} className="mr-2" />
                        Yeni Misyon Ekle
                      </Button>
                    </div>
                  </div>
                  <div className="form-group form-group-default mt-3 pb-2 w-100">
                    <label>Vizyonlar</label>
                    <div className="w-100">
                      {visions
                        ? visions.map((item, key) => {
                            return (
                              <div
                                className="w-100 d-flex align-items-center mt-3"
                                key={key}
                              >
                                {!item.editable ? (
                                  <>
                                    <Button
                                      className="btn btn-danger ml-2 p-2 text-white"
                                      onClick={() =>
                                        showDialog("ok", {
                                          message:
                                            "Veriyi silmek istediğinden emin misin?",
                                          onOk: () =>
                                            deleteMissionsVisionsValues(
                                              item.missions_visions_values_id,
                                              () => getMissionsVisionsValues()
                                            ),
                                        })
                                      }
                                    >
                                      <RiDeleteBin2Fill size={20} />
                                    </Button>
                                    <Button
                                      className="btn btn-primary ml-2 p-2 text-white"
                                      onClick={() => {
                                        visions[key].editable = true;
                                        setVisions([...visions]);
                                      }}
                                    >
                                      <RiEdit2Fill size={20} />
                                    </Button>
                                  </>
                                ) : (
                                  <>
                                    <Button
                                      className="btn btn-success ml-2 p-2 text-white"
                                      disabled={!visions[key].change}
                                      onClick={() =>
                                        showDialog("ok", {
                                          message:
                                            "Değişiklikler kaydedilsin mi?",
                                          onOk: () =>
                                            editMissionsVisionsValues(
                                              item,
                                              () => getMissionsVisionsValues()
                                            ),
                                        })
                                      }
                                    >
                                      <RiCheckLine size={20} />
                                    </Button>
                                    <Button className="btn btn-danger ml-2 p-2 text-white">
                                      <RiCloseCircleFill
                                        size={20}
                                        onClick={() => {
                                          visions[key].editable = false;
                                          setVisions([...visions]);
                                          getMissionsVisionsValues();
                                        }}
                                      />
                                    </Button>
                                  </>
                                )}
                                <textarea
                                  rows={3}
                                  readOnly={!visions[key].editable}
                                  className="form-control border flex-1 ml-4 py-2 px-3 mt-0"
                                  onChange={(e) => {
                                    visions[key].desc = e.target.value;
                                    visions[key].change = true;
                                    setVisions([...visions]);
                                  }}
                                >
                                  {visions[key].desc}
                                </textarea>
                              </div>
                            );
                          })
                        : null}
                    </div>
                    <div className="w-100 text-right mt-3">
                      <Button
                        className="btn btn-primary m-1 text-white"
                        onClick={() =>
                          setAddValues({ visible: true, type: "vision" })
                        }
                      >
                        <RiAddCircleFill size={20} className="mr-2" />
                        Yeni Vizyon Ekle
                      </Button>
                    </div>
                  </div>
                  <div className="form-group form-group-default mt-3 pb-2 w-100">
                    <label>Degerler</label>
                    <div className="w-100">
                      {values
                        ? values.map((item, key) => {
                            return (
                              <div
                                className="w-100 d-flex align-items-center mt-3"
                                key={key}
                              >
                                {!item.editable ? (
                                  <>
                                    <Button
                                      className="btn btn-danger ml-2 p-2 text-white"
                                      onClick={() =>
                                        showDialog("ok", {
                                          message:
                                            "Veriyi silmek istediğinden emin misin?",
                                          onOk: () =>
                                            deleteMissionsVisionsValues(
                                              item.missions_visions_values_id,
                                              () => getMissionsVisionsValues()
                                            ),
                                        })
                                      }
                                    >
                                      <RiDeleteBin2Fill size={20} />
                                    </Button>
                                    <Button
                                      className="btn btn-primary ml-2 p-2 text-white"
                                      onClick={() => {
                                        values[key].editable = true;
                                        setValues([...values]);
                                      }}
                                    >
                                      <RiEdit2Fill size={20} />
                                    </Button>
                                  </>
                                ) : (
                                  <>
                                    <Button
                                      className="btn btn-success ml-2 p-2 text-white"
                                      disabled={!values[key].change}
                                      onClick={() =>
                                        showDialog("ok", {
                                          message:
                                            "Değişiklikler kaydedilsin mi?",
                                          onOk: () =>
                                            editMissionsVisionsValues(
                                              item,
                                              () => getMissionsVisionsValues()
                                            ),
                                        })
                                      }
                                    >
                                      <RiCheckLine size={20} />
                                    </Button>
                                    <Button className="btn btn-danger ml-2 p-2 text-white">
                                      <RiCloseCircleFill
                                        size={20}
                                        onClick={() => {
                                          values[key].editable = false;
                                          setValues([...values]);
                                          getMissionsVisionsValues();
                                        }}
                                      />
                                    </Button>
                                  </>
                                )}
                                <textarea
                                  rows={3}
                                  readOnly={!values[key].editable}
                                  className="form-control border flex-1 ml-4 py-2 px-3 mt-0"
                                  onChange={(e) => {
                                    values[key].desc = e.target.value;
                                    values[key].change = true;
                                    setValues([...values]);
                                  }}
                                >
                                  {values[key].desc}
                                </textarea>
                              </div>
                            );
                          })
                        : null}
                    </div>
                    <div className="w-100 text-right mt-3">
                      <Button
                        className="btn btn-primary m-1 text-white"
                        onClick={() =>
                          setAddValues({ visible: true, type: "value" })
                        }
                      >
                        <RiAddCircleFill size={20} className="mr-2" />
                        Yeni Deger Ekle
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/**
         * Mvv Add Modal
         */}
        <Modal
          title={
            addValues.type == "mission"
              ? "Yeni Misyon Ekle"
              : addValues.type == "vision"
              ? "Yeni Vizyon Ekle"
              : addValues.type == "value"
              ? "Yeni Deger Ekle"
              : null
          }
          visible={addValues.visible}
          onCancel={() => setAddValues({ visible: false })}
          footer={false}
        >
          <div className="w-100">
            <div className="form-group form-group-default">
              <textarea
                className="form-control"
                onChange={(e) =>
                  setAddValues({
                    ...addValues,
                    desc: e.target.value,
                    change: true,
                  })
                }
              >
                {addValues.desc}
              </textarea>
            </div>
          </div>
          <div className="w-100 mt-3 text-right">
            <Button
              className="btn btn-primary text-white"
              onClick={() =>
                addMissionsVisionsValues(() => {
                  setAddValues({ visible: false });
                  getMissionsVisionsValues();
                })
              }
            >
              <RiAddCircleFill size={20} className="mr-2" />
              Ekle
            </Button>
          </div>
        </Modal>
      </Content>
    </div>
  );
}
