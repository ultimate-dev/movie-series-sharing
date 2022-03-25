import { message, Button } from "antd";
import React, { useEffect, useState } from "react";
import { RiAddCircleFill, RiRefreshLine, RiSave2Fill } from "react-icons/ri";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
//Components
import { Content, ImagePicker } from "../../../../../components";
import DataTable from "./DataTable";
import { get, post, put, del } from "../../../../../helpers/http.helper";
import {
  hideLoading,
  showLoading,
  showDialog,
} from "../../../../../redux/actions";
import Modal from "antd/lib/modal/Modal";

export default function Page({ Header }) {
  const [news, setNews] = useState([]);
  const [addValues, setAddValues] = useState({
    visible: false,
  });
  const [editValues, setEditValues] = useState({
    visible: false,
  });

  async function getNews() {
    showLoading();
    await get("api/mains/news").then((res) => {
      if (res.result) {
        setNews(res.news);
      } else {
        message.error(res.message);
      }
      hideLoading();
    });
  }

  async function deleteNews(news_id, run) {
    showLoading();
    await del("api/mains/news", { news_id }).then((res) => {
      if (res.result) {
        message.success(res.message);
        run();
      } else {
        message.error(res.message);
      }
      hideLoading();
    });
  }

  async function addNews(run) {
    showLoading();
    let formData = new FormData();
    formData.append("head", addValues.head ? addValues.head : "");
    formData.append("short_desc", addValues.short_desc ? addValues.short_desc : "");
    formData.append("desc", addValues.desc ? addValues.desc : "");
    formData.append("image", addValues.image ? addValues.image : "");

    await put("api/mains/news", formData).then((res) => {
      if (res.result) {
        message.success(res.message);
        run();
      } else {
        message.error(res.message);
      }
      hideLoading();
    });
  }

  async function editNews(run) {
    showLoading();
    let formData = new FormData();
    formData.append("head", editValues.head ? editValues.head : "");
    formData.append("desc", editValues.desc ? editValues.desc : "");
    formData.append("short_desc", editValues.short_desc ? editValues.short_desc : "");
    formData.append("image", editValues.image ? editValues.image : "");
    formData.append("news_id", editValues.news_id ? editValues.news_id : "");

    await post("api/mains/news", formData).then((res) => {
      if (res.result) {
        message.success(res.message);
        run();
      } else {
        message.error(res.message);
      }
      hideLoading();
    });
  }

  useEffect(() => getNews(), []);

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
        head="Haberler"
        desc="Eklemis oldugunuz haberleri goruntuleyebilir, duzenleyebilir ve silebilirsiniz. Ayrica Yeni haber ekle diyerek haber olusturabilirsiniz."

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
                    Yeni Haber Ekle
                  </Button>
                  <Button
                    className="btn btn-gray m-1"
                    onClick={() => getNews()}
                  >
                    <RiRefreshLine size={20} className="mr-2" />
                    Yenile
                  </Button>
                </div>
                <DataTable
                  items={news}
                  onDelete={(id) =>
                    showDialog("ok", {
                      message: "Veriyi silmek istediğinden emin misin?",
                      onOk: () => deleteNews(id, () => getNews()),
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
          title="Yeni Haber Ekle"
          visible={addValues.visible}
          onCancel={() => setAddValues({ visible: false })}
          footer={false}
          width={800}
        >
          <div className="w-100">
            <div className="form-group form-group-default">
              <label>Fotoğraf</label>
              <ImagePicker
                className="w-100"
                value={addValues?.image}
                onChange={(img) =>
                  setAddValues({ ...addValues, image: img, change: true })
                }
                height="300px"
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
              <label>Kisa Aciklama</label>
              <textarea
                className="form-control"
                rows={3}
                onChange={(e) =>
                  setAddValues({
                    ...addValues,
                    short_desc: e.target.value,
                    change: true,
                  })
                }
              >
                {addValues?.short_desc}
              </textarea>
            </div>
            {/**Desc */}
            <CKEditor
              editor={ClassicEditor}
              data={addValues?.desc}
              onChange={(event, editor) => {
                const data = editor.getData();
                setAddValues({
                  ...addValues,
                  desc: data,
                  change: true,
                });
              }}
            />
          </div>
          <div className="w-100 mt-3 text-right">
            <Button
              className="btn btn-primary text-white"
              onClick={() =>
                addNews(() => {
                  getNews();
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
          title="Haber Düzenle"
          visible={editValues.visible}
          onCancel={() => setEditValues({ visible: false })}
          footer={false}
          width={800}
        >
          <div className="w-100">
            <div className="form-group form-group-default">
              <label>Fotoğraf</label>
              <ImagePicker
                className="w-100"
                value={editValues?.image}
                onChange={(img) =>
                  setEditValues({ ...editValues, image: img, change: true })
                }
                height="300px"
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
              <label>Kisa Aciklama</label>
              <textarea
                className="form-control"
                rows={3}
                onChange={(e) =>
                  setEditValues({
                    ...editValues,
                    short_desc: e.target.value,
                    change: true,
                  })
                }
              >
                {editValues?.short_desc}
              </textarea>
            </div>
            {/**Desc */}
            <CKEditor
              editor={ClassicEditor}
              data={editValues?.desc}
              onChange={(event, editor) => {
                const data = editor.getData();
                setEditValues({
                  ...editValues,
                  desc: data,
                  change: true,
                });
              }}
            />
          </div>
          <div className="w-100 mt-3 text-right">
            <Button
              className="btn btn-primary text-white"
              onClick={() =>
                showDialog("ok", {
                  message: "Değişiklikler kaydedilsin mi?",
                  onOk: () =>
                    editNews(() => {
                      getNews();
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
