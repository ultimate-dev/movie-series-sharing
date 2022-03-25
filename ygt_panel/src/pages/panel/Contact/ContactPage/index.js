import { message, Modal, Button } from "antd";
import React, { useEffect, useState } from "react";
import {
  RiOrderPlayFill,
  RiRefreshLine,
  RiSave2Fill,
  RiAddCircleFill,
} from "react-icons/ri";
//Components
import { Content } from "../../../../components";
import { del, get, put, post } from "../../../../helpers/http.helper";
import {
  hideLoading,
  showLoading,
  showDialog,
} from "../../../../redux/actions";
//Components
import DataTable from "./DataTable";
import SubjectTable from "./SubjectTable";

export default function Page({ Header }) {
  const [contacts, setContacts] = useState([]);
  const [contactSubjects, setContactSubjects] = useState([]);
  const [subjectEdit, setSubjectEdit] = useState({
    value: "",
    change: false,
    visible: false,
  });
  const [subjectAdd, setSubjectAdd] = useState({
    value: "",
    change: false,
  });

  const [subjectVis, setSubjectVis] = useState(false);

  async function getContact() {
    showLoading();
    await get("api/contact").then((res) => {
      if (res.result) {
        setContacts(res.contacts);
        setContactSubjects(res.subjects);
      } else {
        message.error(res.message);
      }
      hideLoading();
    });
  }

  async function deleteContact(contact_id, run) {
    showLoading();
    await del("api/contact", { contact_id }).then((res) => {
      if (res.result) {
        message.success(res.message);
        run();
      } else {
        message.error(res.message);
      }
      hideLoading();
    });
  }

  async function deleteSubject(subject_id, run) {
    showLoading();
    await del("api/contact/subject", { subject_id }).then((res) => {
      if (res.result) {
        message.success(res.message);
        run();
      } else {
        message.error(res.message);
      }
      hideLoading();
    });
  }

  async function addSubject(run) {
    showLoading();
    await put("api/contact/subject", { subject: subjectAdd.value }).then(
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

  async function editSubject(run) {
    showLoading();
    await post("api/contact/subject", {
      subject: subjectEdit.value,
      subject_id: subjectEdit.id,
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

  async function readMessage(read, contact_id, run) {
    showLoading();
    await post("api/contact/read", {
      read,
      contact_id,
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

  useEffect(() => {
    getContact();
  }, []);

  return (
    <div className="page-inner">
      <Header.Breadcrumb
        head="İletişim"
        desc={[
          <div>
            Iletişime geçen kullanıcıları görüntüleyebilir ve kullanıcıların
            üzerine tklayarak kullanıcı hakkında daha fazla bilgi sahibi
            olabilirsiniz.
          </div>,
          <div className="mt-2">
            Mesaj Konusu ekleyerek atılan mesajları daha rahat
            ayrıştırabilirsiniz.
          </div>,
        ]}
      />
      <Content>
        <div className="row">
          <div className="col-md-12">
            <div className="card full-height">
              <div className="card-body">
                <div className="text-right mb-3">
                  <Button
                    className="btn btn-primary text-white m-1"
                    onClick={() => setSubjectVis(true)}
                  >
                    <RiOrderPlayFill size={20} className="mr-2" />
                    Mesaj Konuları
                  </Button>
                  <Button
                    className="btn btn-gray m-1"
                    onClick={() => getContact()}
                  >
                    <RiRefreshLine size={20} className="mr-2" />
                    Yenile
                  </Button>
                </div>
                <DataTable
                  items={contacts}
                  onDelete={(id) =>
                    showDialog("ok", {
                      message: "Veriyi silmek istediğinden emin misin?",
                      onOk: () => deleteContact(id, () => getContact()),
                    })
                  }
                  onRead={(id) =>
                    showDialog("ok", {
                      message: "Bu mesaj okundu olarak isaretlensin mi?",
                      onOk: () => readMessage(1, id, () => getContact()),
                    })
                  }
                  onUnRead={(id) => readMessage(0, id, () => getContact())}
                />
              </div>
            </div>
          </div>
        </div>
        <Modal
          title="Mesaj Konuları Listele"
          visible={subjectVis}
          onCancel={() => setSubjectVis(false)}
          footer={false}
          width={1000}
        >
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <SubjectTable
                items={contactSubjects}
                onDelete={(id) =>
                  showDialog("ok", {
                    message: "Veriyi silmek istediğinden emin misin?",
                    onOk: () => deleteSubject(id, () => getContact()),
                  })
                }
                onEdit={(item) =>
                  setSubjectEdit({
                    value: item.label,
                    id: item.contact_subject_id,
                    change: false,
                    visible: true,
                  })
                }
              />
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="w-100">
                <h6>Ekle</h6>
                <div className="form-group form-group-default">
                  <label>Mesaj Konusu</label>
                  <input
                    className="form-control"
                    values={subjectAdd.value}
                    onChange={(e) =>
                      setSubjectAdd({
                        ...subjectAdd,
                        value: e.target.value,
                        change: true,
                      })
                    }
                  />
                </div>
                <div className="w-100 mb-2">
                  <Button
                    className="btn btn-primary w-100 text-white"
                    onClick={() =>
                      addSubject(() => {
                        setSubjectAdd({
                          value: "",
                          change: false,
                        });
                        getContact();
                      })
                    }
                    disabled={!subjectAdd.change}
                  >
                    <RiAddCircleFill size={20} className="mr-2" />
                    <span>Ekle</span>
                  </Button>
                </div>
              </div>
              <div
                className="w-100 mt-5"
                style={
                  subjectEdit.visible
                    ? {}
                    : { pointerEvents: "none", opacity: 0.6 }
                }
              >
                <h6>Düzenle</h6>
                <div className="form-group form-group-default">
                  <label>Mesaj Konusu</label>
                  <input
                    className="form-control"
                    value={subjectEdit.value}
                    onChange={(e) =>
                      setSubjectEdit({
                        ...subjectEdit,
                        value: e.target.value,
                        change: true,
                      })
                    }
                  />
                </div>
                <div className="w-100 mb-2">
                  <Button
                    className="btn btn-primary w-100 text-white"
                    onClick={() =>
                      editSubject(() => {
                        setSubjectEdit({
                          value: "",
                          change: false,
                          visible: false,
                        });
                        getContact();
                      })
                    }
                    disabled={!subjectEdit.change}
                  >
                    <RiSave2Fill size={20} className="mr-2" />
                    <span>Kaydet</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </Content>
    </div>
  );
}
