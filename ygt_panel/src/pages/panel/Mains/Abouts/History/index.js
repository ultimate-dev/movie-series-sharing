import { message, Modal, Timeline, Button } from "antd";
import React, { useEffect, useState } from "react";
import { orderBy } from "lodash";
import {
  RiAddCircleFill,
  RiRefreshLine,
  RiEditBoxFill,
  RiDeleteBin2Fill,
  RiCloseCircleFill,
  RiCheckboxCircleFill,
} from "react-icons/ri";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
//Components
import { Content, ImagePicker } from "../../../../../components";
import { del, get, put, post } from "../../../../../helpers/http.helper";
import {
  hideLoading,
  showLoading,
  showDialog,
} from "../../../../../redux/actions";

export default function Page({ Header }) {
  let [histories, setHistories] = useState([]);
  let [addHistoriesValues, setAddHistoriesValues] = useState({
    visible: false,
  });

  async function getHistories() {
    showLoading();
    await get("api/mains/histories").then((res) => {
      if (res.result) {
        setHistories(res.histories);
      } else {
        message.error(res.message);
      }
      hideLoading();
    });
  }
  //DEL
  async function deleteHistories(history_id, run) {
    showLoading();
    await del("api/mains/histories", { history_id }).then((res) => {
      if (res.result) {
        message.success(res.message);
        run();
      } else {
        message.error(res.message);
      }
      hideLoading();
    });
  }
  //ADD
  async function addHistories(run) {
    showLoading();
    let formData = new FormData();
    formData.append(
      "image",
      addHistoriesValues.image ? addHistoriesValues.image : ""
    );
    formData.append(
      "year",
      addHistoriesValues.year ? addHistoriesValues.year : ""
    );
    formData.append(
      "desc",
      addHistoriesValues.desc ? addHistoriesValues.desc : ""
    );

    await put("api/mains/histories", formData).then((res) => {
      if (res.result) {
        message.success(res.message);
        run();
      } else {
        message.error(res.message);
      }
      hideLoading();
    });
  }
  //EDIT
  async function editHistories(item, run) {
    showLoading();
    let formData = new FormData();
    formData.append("image", item.image ? item.image : "");
    formData.append("year", item.year ? item.year : "");
    formData.append("desc", item.desc ? item.desc : "");
    formData.append("history_id", item.history_id ? item.history_id : "");

    await post("api/mains/histories", formData).then((res) => {
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
    getHistories();
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
        head="Tarihçe"
        desc="Tarihce bolundeki tarihleri sirali halde goruntuleyebilirsiniz. Ayrica Yeni Tarih ekleyebilir, duzenleyebilir ve silebilirsiniz."
      />
      <Content>
        <div className="row">
          <div className="col-md-12">
            <div className="card full-height">
              <div className="card-body">
                <div className="text-right mb-3">
                  <Button
                    className="btn btn-primary text-white m-1"
                    onClick={() => setAddHistoriesValues({ visible: true })}
                  >
                    <RiAddCircleFill size={20} className="mr-2" />
                    Yeni Tarih Ekle
                  </Button>
                  <Button
                    className="btn btn-gray m-1"
                    onClick={() => getHistories()}
                  >
                    <RiRefreshLine size={20} className="mr-2" />
                    Yenile
                  </Button>
                </div>
                <div className="w-100 mt-4">
                  <Timeline mode="alternate">
                    {histories
                      ? histories.map((item, key) => (
                          <Timeline.Item key={key}>
                            <div className="w-100 text-center mb-1">
                              {
                                //* Editable - Delete - Cancel
                              }
                              {!item.editable ? (
                                <>
                                  <Button
                                    className="btn btn-primary text-white p-2 mp2"
                                    onClick={() => {
                                      histories[key]["editable"] = true;
                                      setHistories([...histories]);
                                    }}
                                  >
                                    <RiEditBoxFill size={20} />
                                  </Button>
                                  <Button
                                    className="btn btn-danger text-white p-2 m-2"
                                    onClick={() =>
                                      showDialog("ok", {
                                        message:
                                          "Veriyi silmek istediğinden emin misin?",
                                        onOk: () =>
                                          deleteHistories(
                                            item.history_id,
                                            () => {
                                              window.location.reload();
                                            }
                                          ),
                                      })
                                    }
                                  >
                                    <RiDeleteBin2Fill size={20} />
                                  </Button>
                                </>
                              ) : (
                                <>
                                  <Button
                                    className="btn btn-danger text-white p-2 mp2"
                                    onClick={() => {
                                      histories[key]["editable"] = false;
                                      setHistories([...histories]);
                                      getHistories();
                                    }}
                                  >
                                    <RiCloseCircleFill size={20} />
                                  </Button>
                                  <Button
                                    className="btn btn-success text-white p-2 m-2"
                                    onClick={() =>
                                      showDialog("ok", {
                                        message:
                                          "Değişiklikler kaydedilsin mi?",
                                        onOk: () =>
                                          editHistories(item, () =>
                                            getHistories()
                                          ),
                                      })
                                    }
                                    disabled={!histories[key].change}
                                  >
                                    <RiCheckboxCircleFill size={20} />
                                  </Button>
                                </>
                              )}
                            </div>
                            <div
                              className="w-100"
                              style={
                                histories[key]["editable"]
                                  ? {}
                                  : { opacity: 0.8, pointerEvents: "none" }
                              }
                            >
                              <div className="form-group form-group-default">
                                <label>Yıl</label>
                                <input
                                  className="form-control"
                                  value={item.year}
                                  onChange={(e) => {
                                    histories[key].year = e.target.value;
                                    histories[key].change = true;
                                    setHistories([...histories]);
                                  }}
                                />
                              </div>
                              {/**Image */}
                              <div className="form-group form-group-default">
                                <label>Fotograf Sec</label>
                                <ImagePicker
                                  value={item.image}
                                  className="mt-2 mb-2"
                                  width="100%"
                                  height="300px"
                                  onChange={(img) => {
                                    histories[key].image = img;
                                    histories[key].change = true;
                                    setHistories([...histories]);
                                  }}
                                />
                              </div>
                              {/**Desc */}
                              <CKEditor
                                editor={ClassicEditor}
                                data={item.desc}
                                onChange={(event, editor) => {
                                  const data = editor.getData();
                                  histories[key].desc = data;
                                  histories[key].change = true;
                                  setHistories([...histories]);
                                }}
                              />
                            </div>
                          </Timeline.Item>
                        ))
                      : null}
                  </Timeline>
                </div>
              </div>
            </div>
          </div>
        </div>
        {
          //* Add History Modal
        }
        <Modal
          title="Yeni Tarih Ekle"
          visible={addHistoriesValues.visible}
          onCancel={() => setAddHistoriesValues({ visible: false })}
          footer={false}
        >
          <div className="w-100">
            <div className="form-group form-group-default">
              <label>Yıl</label>
              <input
                className="form-control"
                value={addHistoriesValues?.year}
                onChange={(e) => {
                  setAddHistoriesValues({
                    ...addHistoriesValues,
                    year: e.target.value,
                    change: true,
                  });
                }}
              />
            </div>
            <div className="form-group form-group-default">
              <label className="mb-2">Fotoğraf Seç</label>
              <ImagePicker
                width="100%"
                height="250px"
                value={addHistoriesValues?.image}
                onChange={(img) => {
                  setAddHistoriesValues({
                    ...addHistoriesValues,
                    image: img,
                    change: true,
                  });
                }}
              />
            </div>
            {/**Desc */}
            <CKEditor
              editor={ClassicEditor}
              data={addHistoriesValues.desc ? addHistoriesValues.desc : ""}
              onChange={(event, editor) => {
                const data = editor.getData();
                setAddHistoriesValues({
                  ...addHistoriesValues,
                  desc: data,
                  change: true,
                });
              }}
            />
          </div>

          <div className="w-100 mt-3 text-right">
            <Button
              className="btn btn-primary text-white"
              disabled={!addHistoriesValues.change}
              onClick={() =>
                addHistories(() => {
                  window.location.reload();
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
