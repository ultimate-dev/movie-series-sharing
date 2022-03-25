import { message, Modal, Button } from "antd";
import React, { useEffect, useState } from "react";
import {
  RiAddCircleFill,
  RiRefreshLine,
  RiSave2Fill,
  RiEditBoxFill,
  RiDeleteBin2Fill,
  RiCheckboxCircleFill,
  RiCloseCircleFill,
} from "react-icons/ri";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CarouselResp from "react-multi-carousel";
//Components
import { Content, ImagePicker } from "../../../../../components";
import { del, get, put, post } from "../../../../../helpers/http.helper";
import {
  hideLoading,
  showLoading,
  showDialog,
} from "../../../../../redux/actions";

export default function Page({ Header }) {
  const screen_id = 3;

  const [blog, setBlog] = useState({});
  const [addImageValues, setAddImageValues] = useState({ visible: false });
  const [images, setImages] = useState([]);

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
    let formData = new FormData();
    formData.append("blog_id", blog.blog_id ? blog.blog_id : "");
    formData.append("image", blog.image ? blog.image : "");
    formData.append("desc", blog.desc ? blog.desc : "");
    formData.append("head", blog.head ? blog.head : "");
    formData.append("subhead", blog.subhead ? blog.subhead : "");

    showLoading();
    await post("api/mains/blog", formData).then((res) => {
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
  async function getImages() {
    showLoading();
    await get("api/mains/images", { screen_id }).then((res) => {
      if (res.result) {
        setImages(res.images);
      } else {
        message.error(res.message);
      }
      hideLoading();
    });
  }
  //POST
  async function editImages(item, run) {
    showLoading();
    let formData = new FormData();
    formData.append("image", item.image);
    formData.append("image_id", item.image_id);

    await post("api/mains/images", formData).then((res) => {
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
  async function deleteImages(image_id, run) {
    showLoading();
    await del("api/mains/images", { image_id }).then((res) => {
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
  async function addImages(run) {
    showLoading();
    let formData = new FormData();
    formData.append("image", addImageValues.image);
    formData.append("screen_id", screen_id);

    await put("api/mains/images", formData).then((res) => {
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
    getImages();
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
        head="Şarık Tara Anısına"
        desc="Bu sayfada Şarık Tara sayfasina resim ekleyebilir ve girmis oldugunuz bilgileri duzenleyebilirsiniz."
      />
      <Content>
        <div className="row">
          {/**
           * Images
           */}
          <div className="col-md-12">
            <div className="card full-height">
              <div className="card-body">
                <div className="w-100 text-right mb-3">
                  <Button
                    className="btn btn-primary m-1 text-white"
                    onClick={() => setAddImageValues({ visible: true })}
                  >
                    <RiAddCircleFill size={20} className="mr-2" />
                    Yeni Fotograf Ekle
                  </Button>
                  <Button className="btn btn-gray m-1">
                    <RiRefreshLine
                      size={20}
                      className="mr-2"
                      onClick={getImages}
                    />
                    Yenile
                  </Button>
                </div>
                <div className="w-100">
                  <CarouselResp responsive={responsive}>
                    {images
                      ? images.map((item, key) => (
                          <div className="p-3" key={key}>
                            <div className="w-100 text-center mb-1">
                              {
                                //* Editable - Delete - Cancel
                              }
                              {!item.editable ? (
                                <>
                                  <Button
                                    className="btn btn-primary text-white p-2 mp2"
                                    onClick={() => {
                                      images[key]["editable"] = true;
                                      setImages([...images]);
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
                                          deleteImages(item.image_id, () =>
                                            getImages()
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
                                      images[key]["editable"] = false;
                                      setImages([...images]);
                                      getImages();
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
                                          editImages(item, () => getImages()),
                                      })
                                    }
                                    disabled={!images[key].change}
                                  >
                                    <RiCheckboxCircleFill size={20} />
                                  </Button>
                                </>
                              )}
                            </div>
                            {/**
                             * Forms
                             */}
                            <div
                              className="w-100"
                              style={
                                images[key]["editable"]
                                  ? {}
                                  : { opacity: 0.8, pointerEvents: "none" }
                              }
                            >
                              <div className="form-group form-group-default">
                                <label>Fotograf</label>
                                <ImagePicker
                                  value={item.image}
                                  width="100%"
                                  fit="contain"
                                  className="mt-2 mb-2"
                                  onChange={(img) => {
                                    images[key].image = img;
                                    images[key].change = true;
                                    setImages([...images]);
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        ))
                      : null}
                  </CarouselResp>
                </div>
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
                  {/**Image */}
                  <div className="form-group form-group-default">
                    <label>Fotoğraf</label>
                    <ImagePicker
                      className="mt-2"
                      width="100%"
                      height="400px"
                      value={blog?.image}
                      onChange={(img) => {
                        setBlog({
                          ...blog,
                          image: img,
                          change: true,
                        });
                      }}
                    />
                  </div>
                  <div className="row">
                    {/**Head */}
                    <div className="col-md-6">
                      <div className="form-group form-group-default">
                        <label>Sayfa Basligi(Opsiyonel)</label>
                        <input
                          className="form-control"
                          value={blog?.head}
                          onChange={(e) => {
                            setBlog({
                              ...blog,
                              head: e.target.value,
                              change: true,
                            });
                          }}
                        />
                      </div>
                    </div>
                    {/**SubHead */}
                    <div className="col-md-6">
                      <div className="form-group form-group-default">
                        <label>Icerik Basligi(Opsiyonel)</label>
                        <input
                          className="form-control"
                          value={blog?.subhead}
                          onChange={(e) => {
                            setBlog({
                              ...blog,
                              subhead: e.target.value,
                              change: true,
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
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
        </div>
        <Modal
          title="Yeni Fotograf Ekle"
          visible={addImageValues.visible}
          onCancel={() => setAddImageValues({ visible: false })}
          footer={false}
        >
          <div className="w-100">
            <div className="form-group form-group-default">
              <label className="mb-2">Fotoğrafı Seç</label>
              <ImagePicker
                width="100%"
                height="250px"
                value={addImageValues?.image}
                onChange={(img) => {
                  setAddImageValues({
                    ...addImageValues,
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
              disabled={!addImageValues.change}
              onClick={() =>
                addImages(() => {
                  getImages();
                  setAddImageValues({ visible: false });
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
