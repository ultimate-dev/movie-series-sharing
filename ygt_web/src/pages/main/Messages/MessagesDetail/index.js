import { Button, message as alertmessage } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { get, post } from "../../../../helpers/http.helper";
import { hideLoading, showLoading } from "../../../../redux/actions";
import { MessageList } from "react-chat-elements";
import moment from "moment";
import { useSelector } from "react-redux";
import { orderBy } from "lodash";

export default function Page() {
  let [message, setMessage] = useState("");
  let [messages, setMessages] = useState([]);
  let [info, setInfo] = useState({});
  let [timer, setTimer] = useState(0);

  let { user_id } = useParams();

  async function getMessages() {
    if (timer == 1) showLoading();
    await get("api/messages/detail", { user_id }).then((res) => {
      if (res.result) {
        setMessages(res.messages);
        setInfo(res.info);
      } else {
        alertmessage.error(res.message);
      }
      if (timer == 1) hideLoading();
    });
  }

  useEffect(() => {
    getMessages();
    const interval = setInterval(() => {
      getMessages();
      setTimer(timer + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, [user_id]);

  /*
  useEffect(() => {
    getMessages();
  }, [user_id]);
  */

  async function sendMessage(run) {
    showLoading();
    await post("api/messages/detail", { message, user_id }).then((res) => {
      if (res.result) {
        run();
      } else {
        alertmessage.error(res.message);
      }
      hideLoading();
    });
  }

  return (
    <div className="w-100">
      <div className="card" data-aos="fade-up">
        <div className="card-body d-flex justify-content-end">
          <Link
            className="d-flex align-items-center"
            to={"/main/u/" + info?.user_id}
          >
            <div className="ms-3 text-end me-3">
              <div className="fw-500 text-dark">
                {info?.name + " " + info?.surname}
              </div>
              <div className="fw-300 text-muted">@{info?.user_name}</div>
            </div>
            <Avatar
              className="avatar"
              size={45}
              style={{ minWidth: 45, minHeight: 45 }}
              src={info?.image}
              draggable={false}
            >
              {String(
                String(info?.name).substring(0, 1) +
                  String(info?.surname).substring(0, 1)
              ).toUpperCase()}
            </Avatar>
          </Link>
        </div>
      </div>

      <div className="card" data-aos="fade-up">
        <div
          className="card-body"
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ overflow: "auto", height: window.innerHeight - 330 }}>
            <MessageList
              className="h-100"
              lockable={true}
              toBottomHeight={"100%"}
              dataSource={[
                ...orderBy(messages, "createdAt", "asc").map((item) => ({
                  position: user_id == item.user_id ? "left" : "right",
                  type: "text",
                  text: item.message,
                  dateString: moment(
                    item.createdAt,
                    "YYYY-MM-DD'T'HH:mm:ss'Z'"
                  ).fromNow(),
                  status:
                    user_id == item.user_id
                      ? item.read == 1
                        ? "read"
                        : "received"
                      : false,
                })),
              ]}
            />
          </div>
          <div className="d-flex mt-3">
            <input
              placeholder="Mesaj Yaz"
              className="form-control me-3"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button
              className="btn btn-primary"
              disabled={message.length == 0}
              onClick={() =>
                sendMessage(() => {
                  setMessage("");
                  getMessages();
                })
              }
            >
              Gonder
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
