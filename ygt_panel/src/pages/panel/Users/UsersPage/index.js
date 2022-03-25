import { message, Button } from "antd";
import React, { useEffect, useState } from "react";
import { RiRefreshLine } from "react-icons/ri";
import { Link } from "react-router-dom";
//Hooks
import { useQuery } from "../../../../hooks/use-query";
//Components
import { Content } from "../../../../components";
import { get, post } from "../../../../helpers/http.helper";
import {
  hideLoading,
  showDialog,
  showLoading,
} from "../../../../redux/actions";
//
import DataTable from "./DataTable";

export default function Page({ Header }) {
  const [users, setUsers] = useState([]);

  let query = useQuery();
  let user = query.get("user") ? query.get("user") : "all";

  async function getUsers() {
    showLoading();
    await get("api/users/list", { user }).then((res) => {
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
    await post("api/users/ban", { user_id: id }).then((res) => {
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
  }, [user]);

  return (
    <div className="page-inner">
      <Header.Breadcrumb
        breadcrumb={[
          {
            name: "Kullanıcılar",
            to: "/users/list",
          },
        ]}
        head="Kullanıcı Liste"
        desc="Bu sayfada kullanıcıları görüntüleyebilir ve kullanıcıları banlayabilirsiniz."
      />
      <Content>
        <div className="row">
          <div className="col-md-12">
            <div className="card full-height">
              <div className="card-body">
                {user !== "all" && users.length > 0 ? (
                  <div className="alert alert-secondary">
                    [{user}] Id'li Kullanıcı Görüntüleniyor.
                    <Link className="ml-2 text-secondary">İptal</Link>
                  </div>
                ) : user !== "all" ? (
                  <div className="alert alert-warning">
                    [{user}] Id'li Kullanıcı Bulunamadı. Kullanıcı Banlanmış
                    Olabilir.
                    <Link className="ml-2 text-warning">İptal</Link>
                  </div>
                ) : null}

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
                      message: "Kullanıcıyı banlamak istediğinize emin misiniz?",
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
