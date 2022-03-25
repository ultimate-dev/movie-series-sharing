import { message, Button, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CarouselResp from "react-multi-carousel";

//Components
import { Content, ImagePicker } from "../../../../components";
import { get, post, del, put } from "../../../../helpers/http.helper";
import {
  hideLoading,
  showLoading,
  showDialog,
} from "../../../../redux/actions";
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
  RiFileListFill,
} from "react-icons/ri";

export default function Page({ Header }) {
  const screen_id = 14;

  const [blog, setBlog] = useState({});
  const [lists, setLists] = useState([]);
  const [addListsValues, setAddListsValues] = useState({ visible: false });
  const [carts, setCarts] = useState([]);
  const [cartListsValues, setCartListsValues] = useState({
    visible: false,
  });
  const [addCartsValues, setAddCartsValues] = useState({ visible: false });

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
  async function getCarts() {
    showLoading();
    await get("api/mains/carts", { screen_id }).then((res) => {
      if (res.result) {
        setCarts(res.carts);
      } else {
        message.error(res.message);
      }
      hideLoading();
    });
  }
  //POST
  async function editCarts(cart, run) {
    showLoading();
    let formData = new FormData();
    formData.append("cart_id", cart.cart_id ? cart.cart_id : "");
    formData.append("image", cart.image ? cart.image : "");
    formData.append("head", cart.head ? cart.head : "");

    await post("api/mains/carts", formData).then((res) => {
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
  async function deleteCarts(cart_id, run) {
    showLoading();
    await del("api/mains/carts", { cart_id }).then((res) => {
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
  async function addCarts(run) {
    showLoading();
    let formData = new FormData();
    formData.append("image", addCartsValues.image);
    formData.append("head", addCartsValues.head);
    formData.append("screen_id", screen_id);

    await put("api/mains/carts", formData).then((res) => {
      if (res.result) {
        message.success(res.message);
        run();
      } else {
        message.error(res.message);
      }
      hideLoading();
    });
  }

  //POST
  async function saveCartLists(cart_lists, cart_id, run) {
    showLoading();
    await post("api/mains/carts/lists", { cart_lists, cart_id }).then((res) => {
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
    getCarts();
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
        head="Sürdürülebilirlik"
        desc="Surdurulebilirlik sayfasindaki tum icerikleri buradan eleyebilir, duzenleyebilir ve silebilirsiniz."
      />
      <Content>
        <div className="row">
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
           * Carts
           */}
          <div className="col-md-12">
            <div className="card full-height">
              <div className="card-body">
                <div className="w-100 text-right mb-3">
                  <Button
                    className="btn btn-primary m-1 text-white"
                    onClick={() => setAddCartsValues({ visible: true })}
                  >
                    <RiAddCircleFill size={20} className="mr-2" />
                    Yeni Kart Ekle
                  </Button>
                  <Button className="btn btn-gray m-1">
                    <RiRefreshLine
                      size={20}
                      className="mr-2"
                      onClick={getCarts}
                    />
                    Yenile
                  </Button>
                </div>
                <div className="w-100">
                  <div className="form-group form-group-default mt-3 pb-2 w-100">
                    <label>Kartlar</label>
                    <div className="w-100">
                      <CarouselResp responsive={responsive}>
                        {carts
                          ? carts.map((item, key) => (
                              <div className="w-100 p-3" key={key}>
                                <div className="w-100 text-center mb-1">
                                  {
                                    //* Editable - Delete - Cancel
                                  }
                                  {!item.editable ? (
                                    <>
                                      <Button
                                        className="btn btn-primary text-white p-2 mp2"
                                        onClick={() => {
                                          carts[key]["editable"] = true;
                                          setCarts([...carts]);
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
                                              deleteCarts(item.cart_id, () =>
                                                getCarts()
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
                                          carts[key]["editable"] = false;
                                          setCarts([...carts]);
                                          getCarts();
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
                                              editCarts(item, () => getCarts()),
                                          })
                                        }
                                        disabled={!carts[key].change}
                                      >
                                        <RiCheckboxCircleFill size={20} />
                                      </Button>
                                    </>
                                  )}
                                </div>
                                <div
                                  className="w-100"
                                  style={
                                    carts[key]["editable"]
                                      ? {}
                                      : { opacity: 0.8, pointerEvents: "none" }
                                  }
                                >
                                  <div className="form-group form-group-default">
                                    <label>Kart Başlığı</label>
                                    <input
                                      className="form-control"
                                      value={carts[key].head}
                                      onChange={(e) => {
                                        carts[key].head = e.target.value;
                                        carts[key].change = true;
                                        setCarts([...carts]);
                                      }}
                                    />
                                  </div>
                                  <div className="form-group form-group-default">
                                    <label>Kart Resmi</label>
                                    <ImagePicker
                                      className="mt-2 w-100"
                                      value={carts[key].image}
                                      onChange={(img) => {
                                        carts[key].image = img;
                                        carts[key].change = true;
                                        setCarts([...carts]);
                                      }}
                                    />
                                  </div>
                                </div>
                                <Button
                                  className="btn btn-primary w-100 mt-2 text-white"
                                  onClick={() =>
                                    setCartListsValues({
                                      visible: true,
                                      cart_lists: [
                                        ...carts[key].cart_lists,
                                      ].map((item, key) => ({ ...item, key })),
                                      cart_id: carts[key].cart_id,
                                    })
                                  }
                                >
                                  <RiFileListFill size={20} className="mr-2" />
                                  Kart Listesi Düzenle
                                </Button>
                                <ul className="w-100 mt-4">
                                  {carts[key].cart_lists?.map((item, key) => (
                                    <li
                                      className="w-100 text-muted mt-2"
                                      key={key}
                                    >
                                      {item.label}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))
                          : null}
                      </CarouselResp>
                    </div>
                  </div>
                </div>
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
        {/**
         * Cart Lists Modal
         */}
        <Modal
          title="Kart Listesi Düzenle"
          visible={cartListsValues.visible}
          onCancel={() => setCartListsValues({ visible: false })}
          footer={false}
          width={800}
        >
          <div className="w-100">
            {cartListsValues.cart_lists
              ? cartListsValues.cart_lists.map((item, key) => {
                  if (item.status)
                    return (
                      <div
                        className="w-100 d-flex align-items-center mt-3"
                        key={key}
                      >
                        <Button
                          className="btn btn-danger ml-2 p-2 text-white"
                          onClick={() => {
                            if (cartListsValues.cart_lists[key].cart_list_id) {
                              cartListsValues.cart_lists[key].status = 0;
                              cartListsValues.change = true;
                              setCartListsValues({
                                ...cartListsValues,
                                cart_lists: [...cartListsValues.cart_lists],
                              });
                            }
                          }}
                        >
                          <RiCloseCircleFill size={20} />
                        </Button>

                        <input
                          className="form-control border flex-1 ml-4 py-2 px-3 mt-0"
                          value={cartListsValues.cart_lists[key].label}
                          onChange={(e) => {
                            cartListsValues.cart_lists[key].label =
                              e.target.value;
                            cartListsValues.change = true;
                            setCartListsValues({
                              ...cartListsValues,
                              cart_lists: [...cartListsValues.cart_lists],
                            });
                          }}
                        />
                      </div>
                    );
                })
              : null}
            <div className="w-100 d-flex align-items-center mt-3">
              <Button
                className="btn btn-success ml-2 p-2 text-white w-100"
                onClick={() => {
                  setCartListsValues({
                    ...cartListsValues,
                    cart_lists: [
                      ...cartListsValues.cart_lists,
                      ...[{ label: "", status: 1 }],
                    ],
                    change: true,
                  });
                }}
              >
                <RiAddCircleFill size={20} />
              </Button>
            </div>
          </div>
          <div className="w-100 mt-4 text-right">
            <Button
              className="btn btn-primary text-white"
              disabled={!cartListsValues.change}
              onClick={() =>
                showDialog("ok", {
                  message: "Değişiklikler kaydedilsin mi?",
                  onOk: () =>
                    saveCartLists(
                      cartListsValues.cart_lists,
                      cartListsValues.cart_id,
                      () => {
                        getCarts();
                        setCartListsValues({ visible: false });
                      }
                    ),
                })
              }
            >
              <RiSave2Fill size={20} className="mr-2" />
              Kaydet
            </Button>
          </div>
        </Modal>
        {/**
         * Cart Add Modal
         */}
        <Modal
          title="Yeni Liste Verisi Ekle"
          visible={addCartsValues.visible}
          onCancel={() => setAddCartsValues({ visible: false })}
          footer={false}
        >
          <div className="w-100">
            <div className="form-group form-group-default">
              <label>Kart Başlığı</label>
              <input
                className="form-control"
                value={addCartsValues.head}
                onChange={(e) =>
                  setAddCartsValues({
                    ...addCartsValues,
                    head: e.target.value,
                    change: true,
                  })
                }
              />
            </div>
            <div className="form-group form-group-default">
              <label>Kart Resmi</label>
              <ImagePicker
                className="w-100 mt-2 mb-2"
                value={addCartsValues.image}
                onChange={(img) =>
                  setAddCartsValues({
                    ...addCartsValues,
                    image: img,
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
                addCarts(() => {
                  setAddCartsValues({ visible: false });
                  getCarts();
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
