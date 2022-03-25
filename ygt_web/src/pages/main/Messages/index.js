import React, { useEffect, useState } from "react";
import { hideLoading, showLoading } from "../../../redux/actions";
import { orderBy } from "lodash";
import { get } from "../../../helpers/http.helper";
import { message } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { Link } from "react-router-dom";

export default function Page() {
  let [timer, setTimer] = useState(0);
  let [senders, setSenders] = useState([]);

  async function getSenders() {
    if (timer == 1) showLoading();
    await get("api/messages").then((res) => {
      if (res.result) {
        setSenders(res.senders);
      } else {
        message.error(res.message);
      }
      if (timer == 1) hideLoading();
    });
  }

  useEffect(() => {
    getSenders();
    const interval = setInterval(() => {
      getSenders();
      setTimer(timer + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-100">
      <div className="card">
        <div className="card-header">Mesajlaşmalar</div>
        {senders.length > 0 ? (
          senders.map((item) => (
            <Link
              className="card-body mb-3"
              data-aos="fade-up"
              to={"/main/messages/" + item.user_id}
            >
              <div className="d-flex align-items-center">
                <Avatar
                  className="avatar"
                  size={45}
                  style={{ minWidth: 45, minHeight: 45 }}
                  src={item?.image}
                  draggable={false}
                >
                  {String(
                    String(item?.name).substring(0, 1) +
                      String(item?.surname).substring(0, 1)
                  ).toUpperCase()}
                </Avatar>
                <div className="ms-3">
                  <div className="fw-500 text-dark">
                    {item?.name + " " + item?.surname}
                  </div>
                  <div className="fw-300 text-muted">@{item?.user_name}</div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="alert alert-muted text-center">
            Mesajlaşma bulunamadi
          </div>
        )}
      </div>
    </div>
  );
}
