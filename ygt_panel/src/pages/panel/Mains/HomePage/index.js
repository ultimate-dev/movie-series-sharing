import { message, Button, Select } from "antd";
import React, { useEffect, useState } from "react";
import CarouselResp from "react-multi-carousel";
import {
  RiEditBoxFill,
  RiDeleteBin2Fill,
  RiCloseCircleFill,
  RiCheckboxCircleFill,
  RiRefreshLine,
  RiAddCircleFill,
} from "react-icons/ri";
//Components
import { Content, ImagePicker } from "../../../../components";
import { get, post, put, del } from "../../../../helpers/http.helper";
import {
  hideLoading,
  showLoading,
  showDialog,
} from "../../../../redux/actions";
import Modal from "antd/lib/modal/Modal";

export default function Page({ Header }) {
  const screen_id = 1;

  let [sliders, setSliders] = useState([]);
  let [screens, setScreens] = useState([]);
  let [addValues, setAddValues] = useState({
    visible: false,
  });

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1150 },
      items: 2.5,
    },
    tablet: {
      breakpoint: { max: 1150, min: 600 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 1,
    },
  };
  //GET
  async function getScreens() {
    showLoading();
    await get("api/mains/screens").then((res) => {
      if (res.result) {
        setScreens(res.screens);
      } else {
        message.error(res.message);
      }
      hideLoading();
    });
  }
  //GET
  async function getSliders() {
    showLoading();
    await get("api/mains/sliders", { screen_id }).then((res) => {
      if (res.result) {
        setSliders(res.sliders);
      } else {
        message.error(res.message);
      }
      hideLoading();
    });
  }
  //DEL
  async function deleteSliders(slider_id, run) {
    showLoading();
    await del("api/mains/sliders", { slider_id }).then((res) => {
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
  async function addSliders(run) {
    showLoading();
    let formData = new FormData();
    formData.append("image", addValues.image ? addValues.image : "");
    formData.append("order", addValues.order ? addValues.order : "");
    formData.append("title", addValues.title ? addValues.title : "");
    formData.append("desc", addValues.desc ? addValues.desc : "");
    if (addValues.goto_id) formData.append("goto_id", addValues.goto_id);
    formData.append("screen_id", screen_id);

    await put("api/mains/sliders", formData).then((res) => {
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
  async function editSliders(item, run) {
    showLoading();
    let formData = new FormData();
    formData.append("image", item.image ? item.image : "");
    formData.append("order", item.order ? item.order : "");
    formData.append("title", item.title ? item.title : "");
    formData.append("desc", item.desc ? item.desc : "");
    if (item.goto_id) formData.append("goto_id", item.goto_id);
    formData.append("slider_id", item.slider_id ? item.slider_id : "");

    await post("api/mains/sliders", formData).then((res) => {
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
    getSliders();
    getScreens();
  }, []);

  return (
    <div className="page-inner">
      <Header.Breadcrumb
        breadcrumb={[
          {
            name: "Sayfalar",
            to: "/mains",
          },
        ]}
        head="Anasayfa"
        desc="Ana Sayfadaki tum icerikleri buradan eleyebilir, duzenleyebilir ve silebilirsiniz."
      />
      <Content>
        <div className="row">
          <div className="col-md-12">
            <div className="card full-height">
              <div className="card-body">
                {
                  //* Buttons
                }
                <div className="w-100 text-right mb-3">
                  <Button
                    className="btn btn-primary text-white m-1"
                    onClick={() => setAddValues({ visible: true })}
                  >
                    <RiAddCircleFill size={20} className="mr-2" />
                    Yeni Slider Sayfası Ekle
                  </Button>
                  <Button
                    className="btn btn-gray m-1"
                    onClick={() => getSliders()}
                  >
                    <RiRefreshLine size={20} className="mr-2" />
                    Yenile
                  </Button>
                </div>
                {
                  //* Sliders
                }
                <CarouselResp responsive={responsive}>
                  {sliders.map((item, key) => (
                    <div className="w-100" style={{ padding: 15 }}>
                      <div className="w-100 text-center mb-1">
                        {
                          //* Editable - Delete - Cancel
                        }
                        {!item.editable ? (
                          <>
                            <Button
                              className="btn btn-primary text-white p-2 mp2"
                              onClick={() => {
                                sliders[key]["editable"] = true;
                                setSliders([...sliders]);
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
                                    deleteSliders(item.slider_id, () =>
                                      getSliders()
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
                                sliders[key]["editable"] = false;
                                setSliders([...sliders]);
                                getSliders();
                              }}
                            >
                              <RiCloseCircleFill size={20} />
                            </Button>
                            <Button
                              className="btn btn-success text-white p-2 m-2"
                              onClick={() =>
                                showDialog("ok", {
                                  message: "Değişiklikler kaydedilsin mi?",
                                  onOk: () =>
                                    editSliders(item, () => getSliders()),
                                })
                              }
                              disabled={!sliders[key].change}
                            >
                              <RiCheckboxCircleFill size={20} />
                            </Button>
                          </>
                        )}
                      </div>
                      {
                        //*Form
                      }
                      <div
                        className="w-100"
                        style={
                          sliders[key]["editable"]
                            ? {}
                            : { opacity: 0.8, pointerEvents: "none" }
                        }
                      >
                        <div className="form-group form-group-default">
                          <label className="mb-2">Arkaplan Fotoğrafı Seç</label>
                          <ImagePicker
                            width="100%"
                            height="250px"
                            value={sliders[key]["image"]}
                            onChange={(img) => {
                              sliders[key]["image"] = img;
                              sliders[key]["change"] = true;
                              setSliders([...sliders]);
                            }}
                          />
                        </div>
                        <div className="form-group form-group-default">
                          <label className="mb-2">Sıra</label>
                          <input
                            type="number"
                            className="form-control"
                            value={sliders[key]["order"]}
                            onChange={(e) => {
                              sliders[key]["order"] = e.target.value;
                              sliders[key]["change"] = true;
                              setSliders([...sliders]);
                            }}
                          />
                        </div>
                        <div className="form-group form-group-default">
                          <label className="mb-2">Başlık(Opsiyonel)</label>
                          <input
                            className="form-control"
                            value={sliders[key]["title"]}
                            onChange={(e) => {
                              sliders[key]["title"] = e.target.value;
                              sliders[key]["change"] = true;
                              setSliders([...sliders]);
                            }}
                          />
                        </div>
                        <div className="form-group form-group-default">
                          <label className="mb-2">Açıklama(Opsiyonel)</label>
                          <textarea
                            className="form-control"
                            rows={5}
                            onChange={(e) => {
                              sliders[key]["desc"] = e.target.value;
                              sliders[key]["change"] = true;
                              setSliders([...sliders]);
                            }}
                          >
                            {sliders[key]["desc"]}
                          </textarea>
                        </div>
                        <div className="form-group form-group-default">
                          <label className="mb-2">Sayfaya Git(Opsiyonel)</label>
                          <Select
                            className="form-select"
                            defaultValue={sliders[key]["goto_id"]}
                            onChange={(value) => {
                              sliders[key]["goto_id"] = value;
                              sliders[key]["change"] = true;
                              setSliders([...sliders]);
                            }}
                          >
                            <Select.Option value={null}>
                              Seçilmemiş...
                            </Select.Option>
                            {screens.map((p, i) => (
                              <Select.Option key={i} value={p.screen_id}>
                                {p.label}
                              </Select.Option>
                            ))}
                          </Select>
                        </div>
                      </div>
                    </div>
                  ))}
                </CarouselResp>
              </div>
            </div>
          </div>
        </div>
        {
          //* Add Modal
        }
        <Modal
          title="Yeni Slider Sayfası Ekle"
          visible={addValues.visible}
          onCancel={() => setAddValues({ visible: false })}
          footer={false}
        >
          <div className="w-100">
            <div className="form-group form-group-default">
              <label className="mb-2">Arkaplan Fotoğrafı Seç</label>
              <ImagePicker
                width="100%"
                height="250px"
                value={addValues?.image}
                onChange={(img) => {
                  setAddValues({
                    ...addValues,
                    image: img,
                    change: true,
                  });
                }}
              />
            </div>
            <div className="form-group form-group-default">
              <label className="mb-2">Sıra</label>
              <input
                type="number"
                className="form-control"
                value={addValues?.order}
                onChange={(e) => {
                  setAddValues({
                    ...addValues,
                    order: e.target.value,
                    change: true,
                  });
                }}
              />
            </div>
            <div className="form-group form-group-default">
              <label className="mb-2">Başlık(Opsiyonel)</label>
              <input
                className="form-control"
                value={addValues?.title}
                onChange={(e) => {
                  setAddValues({
                    ...addValues,
                    title: e.target.value,
                    change: true,
                  });
                }}
              />
            </div>
            <div className="form-group form-group-default">
              <label className="mb-2">Açıklama(Opsiyonel)</label>
              <textarea
                className="form-control"
                rows={5}
                onChange={(e) => {
                  setAddValues({
                    ...addValues,
                    desc: e.target.value,
                    change: true,
                  });
                }}
              >
                {addValues?.desc}
              </textarea>
            </div>
            <div className="form-group form-group-default">
              <label className="mb-2">Sayfaya Git(Opsiyonel)</label>
              <Select
                className="form-select"
                defaultValue={addValues.goto_id ? addValues.goto_id : null}
                onChange={(e) => {
                  setAddValues({
                    ...addValues,
                    goto_id: e,
                    change: true,
                  });
                }}
              >
                <Select.Option value={null}>Seçilmemiş...</Select.Option>
                {screens.map((p, i) => (
                  <Select.Option key={i} value={p.screen_id}>
                    {p.label}
                  </Select.Option>
                ))}
              </Select>
            </div>
          </div>

          <div className="w-100 mt-3 text-right">
            <Button
              className="btn btn-primary text-white"
              disabled={!addValues.change}
              onClick={() =>
                addSliders(() => {
                  getSliders();
                  setAddValues({ visible: false });
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
