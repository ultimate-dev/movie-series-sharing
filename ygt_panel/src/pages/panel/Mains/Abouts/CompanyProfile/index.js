import { message, Modal, Button } from "antd";
import React, { useEffect, useState } from "react";
import CarouselResp from "react-multi-carousel";
import {
  RiAddCircleFill,
  RiDeleteBin2Fill,
  RiRefreshLine,
  RiSave2Fill,
  RiCheckLine,
  RiEdit2Fill,
  RiCloseCircleFill,
  RiEditBoxFill,
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
  const screen_id = 4;

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

  let [sliders, setSliders] = useState([]);
  let [addSliderValues, setAddSliderValues] = useState({
    visible: false,
  });
  let [multiSliders, setMultiSliders] = useState([]);
  let [addMultiSliderValues, setAddMultiSliderValues] = useState({
    visible: false,
  });
  let [blog, setBlog] = useState({});
  let [lists, setLists] = useState([]);
  let [addListsValues, setAddListsValues] = useState({ visible: false });

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
    formData.append(
      "image",
      addSliderValues.image ? addSliderValues.image : ""
    );
    formData.append(
      "order",
      addSliderValues.order ? addSliderValues.order : ""
    );
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

  //GET
  async function getBlog() {
    showLoading();
    await get("api/mains/blog", { screen_id }).then((res) => {
      if (res.result) {
        setBlog(res.blog);
      } else {
        message.error(res.message);
      }
      hideLoading();
    });
  }
  //POST
  async function editBlog(run) {
    showLoading();
    await post("api/mains/blog", { ...blog }).then((res) => {
      if (res.result) {
        message.success(res.message);
        run();
      } else {
        message.error(res.message);
      }
      hideLoading();
    });
  }

  //GET
  async function getLists() {
    showLoading();
    await get("api/mains/lists", { screen_id }).then((res) => {
      if (res.result) {
        setLists(res.lists);
      } else {
        message.error(res.message);
      }
      hideLoading();
    });
  }
  //POST
  async function editLists(list, run) {
    showLoading();
    await post("api/mains/lists", { ...list }).then((res) => {
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
  async function deleteLists(list_id, run) {
    showLoading();
    await del("api/mains/lists", { list_id }).then((res) => {
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
  async function addLists(run) {
    showLoading();
    await put("api/mains/lists", { ...addListsValues, screen_id }).then(
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

  //GET
  async function getMultiSliders() {
    showLoading();
    await get("api/mains/multi_sliders", { screen_id }).then((res) => {
      if (res.result) {
        setMultiSliders(res.multi_sliders);
      } else {
        message.error(res.message);
      }
      hideLoading();
    });
  }
  //DEL
  async function deleteMultiSliders(multislider_id, run) {
    showLoading();
    await del("api/mains/multi_sliders", { multislider_id }).then((res) => {
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
  async function addMultiSliders(run) {
    showLoading();
    let formData = new FormData();
    formData.append(
      "image",
      addMultiSliderValues.image ? addMultiSliderValues.image : ""
    );
    formData.append("screen_id", screen_id);

    await put("api/mains/multi_sliders", formData).then((res) => {
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
  async function editMultiSliders(item, run) {
    showLoading();
    let formData = new FormData();
    formData.append("image", item.image ? item.image : "");
    formData.append(
      "multislider_id",
      item.multislider_id ? item.multislider_id : ""
    );

    await post("api/mains/multi_sliders", formData).then((res) => {
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
    getBlog();
    getLists();
    getSliders();
    getMultiSliders();
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
        head="Şirket Profili"
        desc="Şirket profili sayfasindaki tum alanlari duzenleyebilir, seilebilir ve yeni veri ekleyebilirsiniz."

      />
      <Content>
        <div className="row">
          {/**
           * Sliders
           */}
          <div className="col-md-12">
            <div className="card full-height">
              <div className="card-body">
                {
                  //* Buttons
                }
                <div className="w-100 text-right mb-3">
                  <Button
                    className="btn btn-primary text-white m-1"
                    onClick={() => setAddSliderValues({ visible: true })}
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
                      </div>
                    </div>
                  ))}
                </CarouselResp>
              </div>
            </div>
          </div>
          {/**
           * Blog
           */}
          <div className="col-md-12">
            <div className="card full-height">
              <div className="card-body">
                <div className="w-100 text-right mb-3">
                  <Button
                    className="btn btn-primary m-1 text-white"
                    disabled={!blog.change}
                    onClick={() =>
                      showDialog("ok", {
                        message: "Değişiklikler kaydedilsin mi?",
                        onOk: () => editBlog(() => getBlog()),
                      })
                    }
                  >
                    <RiSave2Fill size={20} className="mr-2" />
                    Kaydet
                  </Button>
                  <Button className="btn btn-gray m-1">
                    <RiRefreshLine
                      size={20}
                      className="mr-2"
                      onClick={getBlog}
                    />
                    Yenile
                  </Button>
                </div>
                <div className="w-100">
                  {/**Desc */}
                  <CKEditor
                    editor={ClassicEditor}
                    data={blog?.desc}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setBlog({
                        ...blog,
                        desc: data,
                        change: true,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          {/**
           * Lists
           */}
          <div className="col-md-12">
            <div className="card full-height">
              <div className="card-body">
                <div className="w-100 text-right mb-3">
                  <Button
                    className="btn btn-primary m-1 text-white"
                    onClick={() => setAddListsValues({ visible: true })}
                  >
                    <RiAddCircleFill size={20} className="mr-2" />
                    Yeni Liste Verisi Ekle
                  </Button>
                  <Button className="btn btn-gray m-1">
                    <RiRefreshLine
                      size={20}
                      className="mr-2"
                      onClick={getLists}
                    />
                    Yenile
                  </Button>
                </div>

                <div className="w-100">
                  <div className="form-group form-group-default mt-3 pb-2 w-100">
                    <label>Liste</label>
                    <div className="w-100">
                      {lists
                        ? lists.map((item, key) => {
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
                                            deleteLists(item.list_id, () =>
                                              getLists()
                                            ),
                                        })
                                      }
                                    >
                                      <RiDeleteBin2Fill size={20} />
                                    </Button>
                                    <Button
                                      className="btn btn-primary ml-2 p-2 text-white"
                                      onClick={() => {
                                        lists[key].editable = true;
                                        setLists([...lists]);
                                      }}
                                    >
                                      <RiEdit2Fill size={20} />
                                    </Button>
                                  </>
                                ) : (
                                  <>
                                    <Button
                                      className="btn btn-success ml-2 p-2 text-white"
                                      disabled={!lists[key].change}
                                      onClick={() =>
                                        showDialog("ok", {
                                          message:
                                            "Değişiklikler kaydedilsin mi?",
                                          onOk: () =>
                                            editLists(item, () => getLists()),
                                        })
                                      }
                                    >
                                      <RiCheckLine size={20} />
                                    </Button>
                                    <Button className="btn btn-danger ml-2 p-2 text-white">
                                      <RiCloseCircleFill
                                        size={20}
                                        onClick={() => {
                                          lists[key].editable = false;
                                          setLists([...lists]);
                                          getLists();
                                        }}
                                      />
                                    </Button>
                                  </>
                                )}
                                <input
                                  readOnly={!lists[key].editable}
                                  className="form-control border flex-1 ml-4 py-2 px-3 mt-0"
                                  value={lists[key].label}
                                  onChange={(e) => {
                                    lists[key].label = e.target.value;
                                    lists[key].change = true;
                                    setLists([...lists]);
                                  }}
                                />
                              </div>
                            );
                          })
                        : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/**
           * Multi Sliders
           */}
          <div className="col-md-12">
            <div className="card full-height">
              <div className="card-body">
                {
                  //* Buttons
                }
                <div className="w-100 text-right mb-3">
                  <Button
                    className="btn btn-primary text-white m-1"
                    onClick={() => setAddMultiSliderValues({ visible: true })}
                  >
                    <RiAddCircleFill size={20} className="mr-2" />
                    Yeni Coklu Slider Sayfası Ekle
                  </Button>
                  <Button
                    className="btn btn-gray m-1"
                    onClick={() => getMultiSliders()}
                  >
                    <RiRefreshLine size={20} className="mr-2" />
                    Yenile
                  </Button>
                </div>
                <CarouselResp responsive={responsive}>
                  {multiSliders.map((item, key) => (
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
                                multiSliders[key]["editable"] = true;
                                setMultiSliders([...multiSliders]);
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
                                    deleteMultiSliders(item.multislider_id, () =>
                                      getMultiSliders()
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
                                multiSliders[key]["editable"] = false;
                                setMultiSliders([...multiSliders]);
                                getMultiSliders();
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
                                    editMultiSliders(item, () => getMultiSliders()),
                                })
                              }
                              disabled={!multiSliders[key].change}
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
                          multiSliders[key]["editable"]
                            ? {}
                            : { opacity: 0.8, pointerEvents: "none" }
                        }
                      >
                        <div className="form-group form-group-default">
                          <label className="mb-2">Fotoğraf Seç</label>
                          <ImagePicker
                            width="100%"
                            height="250px"
                            value={multiSliders[key]["image"]}
                            onChange={(img) => {
                              multiSliders[key]["image"] = img;
                              multiSliders[key]["change"] = true;
                              setMultiSliders([...multiSliders]);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </CarouselResp>
              </div>
            </div>
          </div>
        </div>
        {/**
         * List Add Modal
         */}
        <Modal
          title="Yeni Liste Verisi Ekle"
          visible={addListsValues.visible}
          onCancel={() => setAddListsValues({ visible: false })}
          footer={false}
        >
          <div className="w-100">
            <div className="form-group form-group-default">
              <input
                className="form-control"
                value={addListsValues.label}
                onChange={(e) =>
                  setAddListsValues({
                    ...addListsValues,
                    label: e.target.value,
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
                addLists(() => {
                  setAddListsValues({ visible: false });
                  getLists();
                })
              }
            >
              <RiAddCircleFill size={20} className="mr-2" />
              Ekle
            </Button>
          </div>
        </Modal>
        {
          //* Slider Add Modal
        }
        <Modal
          title="Yeni Slider Sayfası Ekle"
          visible={addSliderValues.visible}
          onCancel={() => setAddSliderValues({ visible: false })}
          footer={false}
        >
          <div className="w-100">
            <div className="form-group form-group-default">
              <label className="mb-2">Fotoğraf Seç</label>
              <ImagePicker
                width="100%"
                height="250px"
                value={addSliderValues?.image}
                onChange={(img) => {
                  setAddSliderValues({
                    ...addSliderValues,
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
                value={addSliderValues?.order}
                onChange={(e) => {
                  setAddSliderValues({
                    ...addSliderValues,
                    order: e.target.value,
                    change: true,
                  });
                }}
              />
            </div>
          </div>

          <div className="w-100 mt-3 text-right">
            <Button
              className="btn btn-primary text-white"
              disabled={!addSliderValues.change}
              onClick={() =>
                addSliders(() => {
                  getSliders();
                  setAddSliderValues({ visible: false });
                })
              }
            >
              <RiAddCircleFill size={20} className="mr-2" />
              Ekle
            </Button>
          </div>
        </Modal>
        {
          //* Multi Slider Add Modal
        }
        <Modal
          title="Yeni Coklu Slider Sayfası Ekle"
          visible={addMultiSliderValues.visible}
          onCancel={() => setAddMultiSliderValues({ visible: false })}
          footer={false}
        >
          <div className="w-100">
            <div className="form-group form-group-default">
              <label className="mb-2">Fotoğraf Seç</label>
              <ImagePicker
                width="100%"
                height="250px"
                value={addMultiSliderValues?.image}
                onChange={(img) => {
                  setAddMultiSliderValues({
                    ...addMultiSliderValues,
                    image: img,
                    change: true,
                  });
                }}
              />
            </div>
           
          </div>

          <div className="w-100 mt-3 text-right">
            <Button
              className="btn btn-primary text-white"
              disabled={!addMultiSliderValues.change}
              onClick={() =>
                addMultiSliders(() => {
                  getMultiSliders();
                  setAddMultiSliderValues({ visible: false });
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
