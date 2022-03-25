import React, { useEffect, useState } from "react";
import Tilt from "react-parallax-tilt";
import { Link, NavLink, useHistory } from "react-router-dom";
import { RiEdit2Fill, RiQuestionAnswerLine } from "react-icons/ri";
import { FiSettings, FiList } from "react-icons/fi";
// Helpers
import { get, post } from "../../../../helpers/http.helper";
import { Button, Avatar, message } from "antd";
import { showLoading, hideLoading } from "../../../../redux/actions";
import Routes from "./routes";

export default function Page() {
  const [user, setUser] = useState({});
  const [followeds, setFolloweds] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [posts, setPosts] = useState([]);
  let [lists, setLists] = useState({});

  let history = useHistory();

  async function getUser() {
    showLoading();
    await get("api/account/").then((res) => {
      if (!res.me) {
        if (res.result) {
          setUser(res.user);
          setFolloweds(res.followeds);
          setFollowers(res.followers);
          setPosts(res.posts);
          setLists(res.lists);
        } else {
          message.error(res.message);
        }
      } else {
        history.push("/main/account");
      }
      hideLoading();
    });
  }
  useEffect(() => getUser(), []);

  return (
    <div className="w-100">
      <Tilt tiltMaxAngleY={5} tiltMaxAngleX={10} className="w-100">
        <div
          className="position-relative w-100 rounded shadow mb-4"
          style={{ height: 200, objectFit: "cover", overflow: "hidden" }}
          data-aos="fade-up"
        >
          <img
            className="w-100 h-100"
            src={user?.back}
            style={{ objectFit: "cover", objectPosition: "center" }}
            draggable={false}
          />
          <Avatar
            className="avatar shadow"
            size={70}
            style={{
              position: "absolute",
              left: 12,
              bottom: 12,
              width: 70,
              height: 70,
              fontSize: 26,
            }}
            src={user?.image}
            draggable={false}
          >
            {String(
              String(user?.name).substring(0, 1) +
                String(user?.surname).substring(0, 1)
            ).toUpperCase()}
          </Avatar>
          <Link
            style={{
              position: "absolute",
              right: 12,
              bottom: 12,
            }}
            to="/main/settings/account"
          >
            <RiEdit2Fill className="text-white" size={24} />
          </Link>
        </div>
      </Tilt>
      <div className="card" data-aos="fade-up">
        <div className="card-body d-flex justify-content-between">
          <div>
            <div className="text-dark fw-500">
              {user?.name + " " + user?.surname}
            </div>
            <div className="text-muted fw-300">@{user?.user_name}</div>
          </div>
          <div className="d-flex">
            <Link
              className="px-3 border-end text-center"
              to="/main/account/followeds"
            >
              <small className="text-muted">Takip</small>
              <div className="text-dark fw-500">{followeds?.length}</div>
            </Link>
            <Link
              className="px-3 border-end text-center"
              to="/main/account/followers"
            >
              <small className="text-muted">Takipci</small>
              <div className="text-dark fw-500">{followers?.length}</div>
            </Link>
            <Link className="px-3 text-center" to="/main/account/posts">
              <small className="text-muted">Gonderi</small>
              <div className="text-dark fw-500">{post?.length}</div>
            </Link>
          </div>
        </div>
        <div className="w-100 mt-3 d-flex justify-content-end">
          <div className="btn-group">
            <NavLink
              className="btn btn-soft-muted"
              to="/main/settings"
              activeClassName="btn-primary text-white"
            >
              <FiSettings size={24} />
            </NavLink>
            <NavLink
              className="btn btn-soft-muted"
              to="/main/messages"
              activeClassName="btn-primary text-white"
            >
              <RiQuestionAnswerLine size={24} />
            </NavLink>
            <NavLink
              className="btn btn-soft-muted"
              to="/main/account/lists"
              activeClassName="btn-primary text-white"
            >
              <FiList size={24} />
            </NavLink>
          </div>
        </div>
        <Routes followeds={followeds} followers={followers} posts={posts} lists={lists}/>
      </div>
    </div>
  );
}
