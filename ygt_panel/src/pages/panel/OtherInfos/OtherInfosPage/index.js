import { Button, message } from "antd";
import React, { useEffect, useState } from "react";
import {
  RiMailFill,
  RiPhoneFill,
  RiFacebookFill,
  RiTwitterFill,
  RiInstagramFill,
  RiLinkedinFill,
  RiYoutubeFill,
  RiRefreshLine,
} from "react-icons/ri";
//Components
import { Content } from "../../../../components";
import { get, post } from "../../../../helpers/http.helper";
import {
  hideLoading,
  showLoading,
  showDialog,
} from "../../../../redux/actions";

export default function Page({ Header }) {
  const [settings, setSettings] = useState({});
  const [change, setChange] = useState(false);

  async function getSettings() {
    showLoading();
    await get("api/settings").then((res) => {
      if (res.result) {
        setSettings(res.settings);
      } else {
        message.error(res.message);
      }
      hideLoading();
    });
  }

  async function saveSettings(run) {
    showLoading();
    await post("api/settings", { ...settings }).then((res) => {
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
    getSettings();
  }, []);

  return (
    <div className="page-inner">
      <Header.Breadcrumb
        head="Diğer Bilgiler"
        desc="Sitenizdeki Genel İletişim Bilgilerini ve Sosyal Mesya hesaplarını Buradan Düzenleyebilirsiniz."
      />
      <Content>
        <div className="row">
          <div className="col-md-12">
            <div className="card full-height">
              <div className="card-body">
                <div className="w-100 text-right mb-3">
                  <Button
                    className="btn btn-gray m-1"
                    onClick={() => getSettings()}
                  >
                    <RiRefreshLine size={20} className="mr-2" />
                    Yenile
                  </Button>
                </div>
                <div className="text-primary mt-5 mb-3">İletişim Bilgileri</div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group form-group-default">
                      <label>E-Posta</label>
                      <div className="d-flex align-items-center">
                        <RiMailFill className="mr-2" size={16} />
                        <input
                          type="text"
                          className="form-control text-muted"
                          value={settings?.email}
                          onChange={(e) => {
                            setSettings({ ...settings, email: e.target.value });
                            setChange(true);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group form-group-default">
                      <label>Telefon</label>
                      <div className="d-flex align-items-center">
                        <RiPhoneFill className="mr-2" size={16} />
                        <input
                          type="text"
                          className="form-control text-muted"
                          value={settings?.phone}
                          onChange={(e) => {
                            setSettings({ ...settings, phone: e.target.value });
                            setChange(true);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-primary mt-5 mb-3">
                  Sosyal Medya Hesapları
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group form-group-default">
                      <label>Facebook</label>
                      <div className="d-flex align-items-center">
                        <RiFacebookFill className="mr-2" size={16} />
                        <input
                          type="text"
                          className="form-control text-muted"
                          value={settings?.facebook}
                          onChange={(e) => {
                            setSettings({
                              ...settings,
                              facebook: e.target.value,
                            });
                            setChange(true);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group form-group-default">
                      <label>Twitter</label>
                      <div className="d-flex align-items-center">
                        <RiTwitterFill className="mr-2" size={16} />
                        <input
                          type="text"
                          className="form-control text-muted"
                          value={settings?.twitter}
                          onChange={(e) => {
                            setSettings({
                              ...settings,
                              twitter: e.target.value,
                            });
                            setChange(true);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group form-group-default">
                      <label>Youtube</label>
                      <div className="d-flex align-items-center">
                        <RiYoutubeFill className="mr-2" size={16} />
                        <input
                          type="text"
                          className="form-control text-muted"
                          value={settings?.youtube}
                          onChange={(e) => {
                            setSettings({
                              ...settings,
                              youtube: e.target.value,
                            });
                            setChange(true);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group form-group-default">
                      <label>Linkedin</label>
                      <div className="d-flex align-items-center">
                        <RiLinkedinFill className="mr-2" size={16} />
                        <input
                          type="text"
                          className="form-control text-muted"
                          value={settings?.linkedin}
                          onChange={(e) => {
                            setSettings({
                              ...settings,
                              linkedin: e.target.value,
                            });
                            setChange(true);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group form-group-default">
                      <label>Instagram</label>
                      <div className="d-flex align-items-center">
                        <RiInstagramFill className="mr-2" size={16} />
                        <input
                          type="text"
                          className="form-control"
                          value={settings?.instagram}
                          onChange={(e) => {
                            setSettings({
                              ...settings,
                              instagram: e.target.value,
                            });
                            setChange(true);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <button
                    className="btn btn-primary"
                    disabled={!change}
                    onClick={() =>
                      showDialog("ok", {
                        message: "Değişiklikler kaydedilsin mi?",
                        onOk: () => saveSettings(() => getSettings()),
                      })
                    }
                  >
                    Kaydet
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Content>
    </div>
  );
}
