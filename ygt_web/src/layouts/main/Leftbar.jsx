import Avatar from "antd/lib/avatar/avatar";
import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { FiHome, FiSettings, FiGrid, FiUser } from "react-icons/fi";
import {
  RiQuestionAnswerLine,
  RiLoginCircleLine,
  RiUserSettingsLine,
} from "react-icons/ri";
import { Button } from "antd";

export default function Leftbar() {
  let user = useSelector((state) => state.userReducer.user);

  return (
    <div className="app-main-leftbar">
      <div className="card">
        <div className="card-body">
          <Link className="d-flex align-items-center" to="/main/account">
            <Avatar
              className="avatar"
              size={45}
              style={{ minWidth: 45, minHeight: 45 }}
              src={user?.image}
              draggable={false}
            >
              {String(
                String(user?.name).substring(0, 1) +
                  String(user?.surname).substring(0, 1)
              ).toUpperCase()}
            </Avatar>
            <div className="ms-3">
              <div className="fw-500 text-dark">
                {user?.name + " " + user?.surname}
              </div>
              <div className="fw-300 text-muted">@{user?.user_name}</div>
            </div>
          </Link>
        </div>
      </div>
      <div className="d-flex justify-content-end my-3">
        <Link className="btn btn-soft-muted me-2" to="/main/settings">
          <RiUserSettingsLine size={22} />
        </Link>
        <Link className="btn btn-soft-muted ms-2" to="/auth/login">
          <RiLoginCircleLine size={22} />
        </Link>
      </div>
      <div className="card card-navigation">
        <div className="card-body">
          <NavLink
            className="card-navigation-item"
            to="/main/home"
            activeClassName="active"
            exact
          >
            <FiHome className="icon" />
            <span className="name">Ana Sayfa</span>
          </NavLink>
          {/*
          }
          <NavLink
            className="card-navigation-item"
            to="/main/recommended"
            activeClassName="active"
            exact
          >
            <FiGrid className="icon" />
            <span className="name">Onerilenler</span>
          </NavLink>
        */}
          <NavLink
            className="card-navigation-item"
            to="/main/messages"
            activeClassName="active"
            exact
          >
            <RiQuestionAnswerLine className="icon" />
            <span className="name">Mesajlaşmalar</span>
          </NavLink>
          <NavLink
            className="card-navigation-item"
            to="/main/account"
            activeClassName="active"
          >
            <FiUser className="icon" />
            <span className="name">Profilim</span>
          </NavLink>
          <NavLink
            className="card-navigation-item"
            to="/main/settings"
            activeClassName="active"
          >
            <FiSettings className="icon" />
            <span className="name">Ayarlar </span>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
