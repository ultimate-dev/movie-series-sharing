import Avatar from "antd/lib/avatar/avatar";
import React, { useEffect, useState } from "react";
import Tilt from "react-parallax-tilt";
import { Link, NavLink, useHistory, useParams } from "react-router-dom";
import { RiAddBoxLine, RiAddBoxFill, RiMessage3Line } from "react-icons/ri";
// Helpers
import { get, post } from "../../../../helpers/http.helper";
import { Button, message } from "antd";
import { showLoading, hideLoading } from "../../../../redux/actions";
import Routes from "./routes";
import { FiList, FiSettings } from "react-icons/fi";

export default function Page() {
  const [user, setUser] = useState({});
  const [followeds, setFolloweds] = useState([]);
  const [followers, setFollowers] = useState([]);
  let [lists, setLists] = useState({});
  const [posts, setPosts] = useState([]);
  const [controlFollow, setControlFollow] = useState(0);

  let { user_id } = useParams();
  let history = useHistory();

  async function getUser() {
    showLoading();
    await get("api/user", { user_id }).then((res) => {
      if (!res.me) {
        if (res.result) {
          setUser(res.user);
          setFolloweds(res.followeds);
          setFollowers(res.followers);
          setPosts(res.posts);
          setControlFollow(res.control_follow);
          setLists(res.lists);
        } else {
          message.error(res.message);
          history.push("/main/account");
        }
      } else {
        history.push("/main/account");
      }
      hideLoading();
    });
  }

  async function onFollow(run) {
    showLoading();
    await post("api/user/follow", { user_id }).then((res) => {
      if (res.result) {
        run();
      } else {
        message.error(res.message);
      }

      hideLoading();
    });
  }

  async function onUnFollow(run) {
    showLoading();
    await post("api/user/unfollow", { user_id }).then((res) => {
      if (res.result) {
        run();
      } else {
        message.error(res.message);
      }

      hideLoading();
    });
  }

  useEffect(() => getUser(), [user_id]);

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
          <div
            style={{
              position: "absolute",
              right: 12,
              bottom: 12,
            }}
            to="/main/settings/account"
          >
            {controlFollow == 1 ? (
              <Button
                className="btn btn-light text-primary"
                onClick={() => onUnFollow(() => getUser())}
              >
                <RiAddBoxFill size={20} className="me-2" />
                Takibi Istegi Gonderildi
              </Button>
            ) : controlFollow == 2 ? (
              <Button
                className="btn btn-light text-primary"
                onClick={() => onUnFollow(() => getUser())}
              >
                <RiAddBoxFill size={20} className="me-2" />
                Takibi Birak
              </Button>
            ) : (
              <Button
                className="btn btn-primary"
                onClick={() => onFollow(() => getUser())}
              >
                <RiAddBoxLine size={20} className="me-2" />
                Takip Istegi Gonder
              </Button>
            )}
          </div>
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
              to={"/main/u/" + user_id + "/followeds"}
            >
              <small className="text-muted">Takip</small>
              <div className="text-dark fw-500">{followeds?.length}</div>
            </Link>
            <Link
              className="px-3 border-end text-center"
              to={"/main/u/" + user_id + "/followers"}
            >
              <small className="text-muted">Takipci</small>
              <div className="text-dark fw-500">{followers?.length}</div>
            </Link>
            <Link
              className="px-3 text-center"
              to={"/main/u/" + user_id + "/posts"}
            >
              <small className="text-muted">Gonderi</small>
              <div className="text-dark fw-500">{post?.length}</div>
            </Link>
          </div>
        </div>
      </div>
      {user.privacy == 0 || controlFollow == 2 ? (
        <div className="w-100 mt-3 d-flex justify-content-end">
          <div className="btn-group">
            <NavLink
              className="btn btn-soft-muted"
              to={"/main/messages/" + user_id}
              activeClassName="btn-primary text-white"
            >
              <RiMessage3Line size={24} />
            </NavLink>

            <NavLink
              className="btn btn-soft-muted"
              to={"/main/u/" + user_id + "/lists"}
              activeClassName="btn-primary text-white"
            >
              <FiList size={24} />
            </NavLink>
          </div>
        </div>
      ) : null}
      {user.privacy == 0 || controlFollow == 2 ? (
        <Routes followeds={followeds} followers={followers} posts={posts} lists={lists} />
      ) : (
        <div className="col-12 mt-3">
          <div className="alert alert-muted text-center p-5">
           Bu Hesap Gizli
          </div>
        </div>
      )}
    </div>
  );
}
