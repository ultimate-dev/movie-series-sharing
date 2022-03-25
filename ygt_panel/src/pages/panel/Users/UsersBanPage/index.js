import { message, Button } from "antd";
import React, { useEffect, useState } from "react";
import { RiRefreshLine } from "react-icons/ri";
//Components
import { Content } from "../../../../components";
import { get, post } from "../../../../helpers/http.helper";
import {
  hideLoading,
  showLoading,
  showDialog,
} from "../../../../redux/actions";
//
import DataTable from "./DataTable";

export default function Page({ Header }) {
  const [users, setUsers] = useState([]);

  async function getUsers() {
    showLoading();
    await get("api/users/ban").then((res) => {
      if (res.result) {
        setUsers(res.users);
      } else {
        message.error(res.message);
      }
      hideLoading();
    });
  }
  async function onBanUser(id) {
    showLoading();
    await post("api/users/unban", { user_id: id }).then((res) => {
      if (res.result) {
        message.success(res.message);
        getUsers();
      } else {
        message.error(res.message);
      }
      hideLoading();
    });
  }
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="page-inner">
      <Header.Breadcrumb
        breadcrumb={[
          {
            name: "Kullanıcılar",
            to: "/users/list",
          },
        ]}
        head="Banlı Kullanıcılar"
        desc="Bu sayfada banlı kullanıcıları görüntüleyebilir ve banlı kullanıcıların banını kaldırabilirsiniz. Banlı kullanıcılar hesaplarına giriş yapamazlar."
      />
      <Content>
        <div className="row">
          <div className="col-md-12">
            <div className="card full-height">
              <div className="card-body">
                <div className="text-right mb-3">
                  <Button className="btn btn-gray m-1" onClick={getUsers}>
                    <RiRefreshLine size={20} className="mr-2" />
                    Yenile
                  </Button>
                </div>
                <DataTable
                  items={users}
                  onBan={(id) =>
                    showDialog("ok", {
                      message:
                        "Kullanıcının banını kaldırmak istediğinize emin misiniz?",
                      onOk: () => onBanUser(id),
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </Content>
    </div>
  );
}
