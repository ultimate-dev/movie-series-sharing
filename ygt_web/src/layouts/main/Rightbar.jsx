import { Button, message } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { orderBy } from "lodash";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { get, post } from "../../helpers/http.helper";
import { hideLoading, showLoading } from "../../redux/actions";

export default function Rightbar() {
  let [requests, setRequests] = useState([]);
  let [messages, setMessages] = useState([]);
  let [senders, setSenders] = useState([]);
  let [timer, setTimer] = useState(0);
  let history = useHistory();

  async function getRequests() {
    if (timer == 1) showLoading();
    await get("api/account/requests").then((res) => {
      if (res.result) {
        setRequests(res.requests);
      } else {
        message.error(res.message);
      }
      if (timer == 1) hideLoading();
    });
  }

  async function onAcFollow(user_id, run) {
    showLoading();
    await post("api/user/accfollow", { user_id }).then((res) => {
      if (res.result) {
        run();
        message.success(res.message);
      } else {
        message.error(res.message);
      }

      hideLoading();
    });
  }

  async function onUnFollow(user_id, run) {
    showLoading();
    await post("api/user/decfollow", { user_id }).then((res) => {
      if (res.result) {
        run();
        message.success(res.message);
      } else {
        message.error(res.message);
      }

      hideLoading();
    });
  }

  async function getMessages() {
    if (timer == 1) showLoading();
    await get("api/messages/lasts").then((res) => {
      if (res.result) {
        setMessages(res.messages);
      } else {
        message.error(res.message);
      }
      if (timer == 1) hideLoading();
    });
  }

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
    getRequests();
    getMessages();
    const interval = setInterval(() => {
      getSenders();
      getRequests();
      getMessages();
      setTimer(timer + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  //useEffect(() => getRequests(), []);

  return (
    <div className="app-main-rightbar">
      {requests.length > 0 ? (
        <div className="card">
          <div className="card-header">Takip Istekleri</div>
          {requests.map((item, key) => (
            <div className="card-body mb-2" key={key}>
              <div className="d-flex">
                <Avatar
                  className="avatar shadow"
                  size={50}
                  style={{
                    minWidth: 50,
                    minHeight: 50,
                    border: "2px solid #fff",
                  }}
                  src={item?.follower?.image}
                  draggable={false}
                >
                  {String(
                    String(item?.follower?.name).substring(0, 1) +
                      String(item?.follower?.surname).substring(0, 1)
                  ).toUpperCase()}
                </Avatar>
                <div className="ms-3">
                  <span className="text-dark fw-500">
                    {item?.follower?.name + " " + item?.follower?.surname}
                  </span>
                  <span className="text-muted fw-300">
                    (@{item?.follower?.user_name})
                  </span>
                  <div className="text-muted">Sizi takip etmek istiyor.</div>
                </div>
              </div>
              <div className="d-flex mt-2">
                <Button
                  className="btn btn-primary me-2 w-100"
                  onClick={() =>
                    onAcFollow(item?.follower?.user_id, () => {
                      getRequests();
                      history.push("/main/u/" + item?.follower?.user_id);
                    })
                  }
                >
                  Kabul Et
                </Button>
                <Button
                  className="btn btn-light ms-2 w-100"
                  onClick={() =>
                    onUnFollow(item?.follower?.user_id, () => {
                      getRequests();
                      history.push("/main/u/" + item?.follower?.user_id);
                    })
                  }
                >
                  Kaldir
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {messages.length > 0 ? (
        <div className="card">
          <div className="card-header">Okunmamis Mesajlar</div>
          {orderBy(messages, "createdAt", "asc").map((item, key) => (
            <Link
              className="card-body mb-2"
              key={key}
              to={"/main/messages/" + item.sender_id}
            >
              <div className="d-flex">
                <Avatar
                  className="avatar shadow"
                  size={50}
                  style={{
                    minWidth: 50,
                    minHeight: 50,
                    border: "2px solid #fff",
                  }}
                  src={item?.sender?.image}
                  draggable={false}
                >
                  {String(
                    String(item?.sender?.name).substring(0, 1) +
                      String(item?.sender?.surname).substring(0, 1)
                  ).toUpperCase()}
                </Avatar>
                <div className="ms-3">
                  <span className="text-dark fw-500">
                    {item?.sender?.name + " " + item?.sender?.surname}
                    <span className="text-muted fw-300">
                      (@{item?.sender?.user_name})
                    </span>
                  </span>
                  <span className="text-muted ms-2">{item.message}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : null}
      <div className="card">
        <div className="card-header">Son Mesajlaşmalar</div>
        <div className="card-body">
          {senders.length > 0 ? (
            senders.map((item) => (
              <Link
                className="d-block my-1 py-2 border-bottom"
                data-aos="fade-up"
                to={"/main/messages/" + item.user_id}
              >
                <div className="d-flex align-items-center">
                  <Avatar
                    className="avatar"
                    size={38}
                    style={{ minWidth: 38, minHeight: 38 }}
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
    </div>
  );
}
