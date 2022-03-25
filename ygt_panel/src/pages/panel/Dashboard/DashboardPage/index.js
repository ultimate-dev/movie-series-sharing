import React, { useState, useEffect } from "react";
import { get } from "../../../../helpers/http.helper";
import {
  RiUserFollowFill,
  RiMessage2Fill,
  RiSurveyFill,
  RiGift2Fill,
} from "react-icons/ri";
import {
  hideLoading,
  showLoading,
  showDialog,
} from "../../../../redux/actions";
//Components
import { Content } from "../../../../components";
import WidgetLastNewUsers from "./WidgetLastNewUsers";
import WidgetUnReadContacts from "./WidgetUnReadContacts";
import WidgetStamp from "./WidgetStamp";

import { message } from "antd";

export default function Page({ Header }) {
  const [newUsers, setNewUsers] = useState([]);
  const [unRead, setUnRead] = useState([]);
  const [counts, setCounts] = useState({});

  async function getDashboard() {
    showLoading();
    await get("api/dashboard").then((res) => {
      if (res) {
        setNewUsers(res.new_users);
        setUnRead(res.unread);
        setCounts(res.counts);
      } else {
        message.error(res.message);
      }
      hideLoading();
    });
  }

  useEffect(() => {
    getDashboard();
  }, []);

  return (
    <>
      <Header.Dashboard />
      <div className="page-inner mt--5">
        <Content>
          <div className="row mt--2">
            <WidgetStamp
              color="primary"
              label="Toplam Kullanıcı"
              value={counts?.users}
              icon={<RiUserFollowFill size={20} />}
            />
            <WidgetStamp
              color="primary"
              label="Erkek Kullanici"
              value={counts?.users_man}
              icon={<RiMessage2Fill size={20} />}
            />
            <WidgetStamp
              color="primary"
              label="Kadin Kullanici"
              value={counts?.users_woman}
              icon={<RiSurveyFill size={20} />}
            />
            <WidgetStamp
              color="primary"
              label="Engellenen Kullanici"
              value={counts?.users_ban}
              icon={<RiGift2Fill size={20} />}
            />
          </div>
          <div className="row mt--1">
            <WidgetLastNewUsers items={newUsers} />
            <WidgetUnReadContacts items={unRead} />
          </div>
        </Content>
      </div>
    </>
  );
}
